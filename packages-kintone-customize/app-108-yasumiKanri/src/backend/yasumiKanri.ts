import { kintoneAppId } from '../../config';
import {
  normDuration, normStatus,
  normType, toKintoneRecords,
  getYasumiWeight, getKintoneType,
  getKintoneStatus,
} from '../helpers/converters';
import { deleteRecords } from './deleteRecords';
import { updateAllStatus } from './updateStatus';
import { getEmployeeNumber } from './user';

import { addRecords, getAllRecords, updateRecords } from 'api-kintone';

const ownRecordFilter = `employeeNumber = "${getEmployeeNumber()}"`;


/**
 * Fetch records on a given date's month
 *
 * @param {Date} luxonDate luxonDate of the month to be processed .
 * @returns {object[]} kintone records
 */
export const fetchYasumiRecords = async (luxonDate: any) => {
  const startDay = luxonDate.startOf('month').toISODate();
  const endDay = luxonDate.endOf('month').toISODate();

  return getAllRecords<DBYasumi.SavedRecord>({
    app: kintoneAppId,
    condition: [
      ownRecordFilter,
      `yasumiDate >= "${startDay}"`,
      `yasumiDate <= "${endDay}"`,
    ].join(' and '),
  });
};

/**
 * Fetch leave records on a given year 
 * 日付を指定し、その年の有休を取得
 *
 * @param {Date} luxonDate Date of the year to be processed .
 * @param {string} employeeNumber 社員番号
 * @returns {object[]} kintone records
 */
export const fetchLeaveRecords = async (luxonDate: any, employeeNumber: any) => {
  const startDay = luxonDate.startOf('year').toISODate();
  const endDay = luxonDate.endOf('year').toISODate();
  const leaveQuery = `type in ("${getKintoneType('day-leave')}")`;
  const statusQuery = `ステータス="${getKintoneStatus('approved')}"`;
  console.log(leaveQuery, statusQuery);
  return getAllRecords({
    app: kintoneAppId,
    condition: [
      `employeeNumber = "${employeeNumber}"`,
      leaveQuery,
      statusQuery,
      `yasumiDate >= "${startDay}"`,
      `yasumiDate <= "${endDay}"`,
    ].join(' and '),
  });
};

/**
 * Find duplicate records that matches fields
 *
 * @param {object} root0 オブジェクト
 * @param {string[]} root0.types 種類
 * @param {Date} root0.yasumiDate 日付
 * @returns {object[]} kintone records
 */
export const findDuplicate = async ({ types, yasumiDate }: any) => {
  const typesStringify = ([].concat(types)).map((item) => `"${item}"`)
    .join(', ');
  const typeQuery = `type in (${typesStringify})`;
  const dateQuery = `yasumiDate = "${yasumiDate}"`;
  const records = await getAllRecords<DB.SavedRecord>({
    app: kintoneAppId,
    condition: [
      ownRecordFilter,
      typeQuery,
      dateQuery,
    ].join(' and '),
  });
  return records;
};

/**
 * Find all records that matches date
 *
 * @param {string} yasumiDate ISO形の日付
 * @returns {object[]} kintone records
 */
export const fetchByYasumiDate = async (yasumiDate: any) => {
  const dateQuery = `yasumiDate = "${yasumiDate}"`;
  const records = await getAllRecords<DB.SavedRecord>({
    app: kintoneAppId,
    condition: [
      ownRecordFilter,
      dateQuery,
    ].join(' and '),
  });
  return records;
};

/**
 * Add records to database.
 *
 * @param {object[]} unsavedRecords 保存されていない kintone records
 * @returns {object[]} 保存されたkintone records
 */
export const addYasumiRecords = async (unsavedRecords: any) => {
  if (!unsavedRecords.length) return 'No records to add';
  const kintoneRecords = toKintoneRecords(unsavedRecords);
  console.log(kintoneRecords);
  const addedRecords = await addRecords({
    app: kintoneAppId,
    records: kintoneRecords, 
  });

  if (addedRecords.ids) {
    await updateAllStatus({ ids: addedRecords.ids });
  }

  return addedRecords;
};

/**
 * Update records.
 * レコードを更新
 *
 * @param {object[]} unsavedRecords 保存されていない yasumi records.
 * @param  {object[]}  savedRecords 保存された yasumi records
 * @returns {object[]} 更新されたkintone records
 */
export const updateYasumiRecords = async (unsavedRecords: any, savedRecords: any) => {
  if (!unsavedRecords.length) return 'No records to update';
  const kintoneRecords = toKintoneRecords(unsavedRecords, savedRecords);
  return updateRecords({ 
    records: kintoneRecords, 
    app: kintoneAppId,
  });
};

/*
yasumiRecToObj(luxonDate)
Example Output
{
 2021-09-01: [
   {
     type: day-ordinary
     duration: day-whole
     status: unprocessed
   }
 ],
}
*/
export const yasumiRecToObj = async (luxonDate: any) => (
  await fetchYasumiRecords(luxonDate)).reduce((accu, curr) => {
  const {
    $id: { value: recordId },
    yasumiDate: { value: yasumiDate },
    type: { value: yasumiType },
    duration: { value: duration },
    //ステータス: { value: status },
  } = curr;

  accu[yasumiDate as string] = (accu[yasumiDate] || []).concat({
    id: recordId,
    type: normType[yasumiType as keyof typeof normType],
    duration: normDuration[duration as keyof typeof normDuration],
    status: normStatus[status as keyof typeof normStatus],
  } as any);

  return accu;
}, {} as Record<string, any>);

export const yasumiUsed = (yasumiRecords: any) => {
  let result = 0;
  if (!yasumiRecords) return result;

  Object?.values(yasumiRecords)
    .forEach((val: any) => {
      const { duration = null } = val.find(({ type }: any) => type === 'day-ordinary') || [];
      result += duration ? getYasumiWeight(duration) : 0;
    });

  return result;
};

/**
 * Delete redundant records from duplicate records
 * 冗長レコードを削除
 *
 * @param {object[]} duplicateRecords Kintoneレコードのオブジェクト
 * @returns {string[] | boolean} 削除されたレコード
 */
export const deleteRedundantRecords = (duplicateRecords: any) => {
  const redundantRecords = duplicateRecords.slice(1);
  if (redundantRecords.length) {
    return deleteRecords({ ids: redundantRecords.map(({ $id: { value: id } }: any) => id) });
  }
  return false;
};

/**
 * Delete redundant types
 * 同じ日に同じ休み種類という冗長レコードを削除する
 *
 * @param {string[]} duplicateType 冗長の休み種類
 * @returns {string[] | boolean} 冗長のレコード番号の配列
 */
export const deleteRedundantType = (duplicateType: any) => {
  const redundantRecords = duplicateType.slice(1);
  if (redundantRecords.length) {
    return deleteRecords({ ids: duplicateType.map(({ id }: any) => id) });
  }
  return false;
};

/**
 * Delete record by dates.
 * 日付を指定し、レコードを削除する
 *
 * @param {string[]} dates  削除する日付.
 * @returns {string[] | string} 削除するレコード番号の配列またはエラーメッセージ
 */
export const deleteRecordsByDates = async (dates: any) => {
  const strToDates = [].concat(dates);

  if (!strToDates.length) return 'No Items to delete.';

  const datesToQuery = strToDates.map((item) => `yasumiDate = "${item}"`).join(' or ');
  const typeToQuery = `type in ("${getKintoneType('day-ordinary')}")`;

  const recordIds = (await getAllRecords({
    app: kintoneAppId,
    condition: [
      ownRecordFilter,
      typeToQuery,
      `(${datesToQuery})`,
    ].join(' and '),
    fields: ['$id'],
  })).map(({ $id }) => $id.value);

  if (recordIds) {
    return deleteRecords({ ids: recordIds });
  }
  return 'No items to delete';
};

export const defaultRecord = {
  type: 'day-ordinary',
  status: 'approved',
  duration: null,
};
