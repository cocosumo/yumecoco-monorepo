import { EmpAffiliations, KEmployees, KEmployeeStores } from 'types';
import { getRecords } from '../common';
import { appId, RecordType } from './config';

/**
 * 店舗番号で店長の社員レコードを取得する
 */
export const getContractCheckers = async (storeId: string) => {

  const keyStoreId : KEmployeeStores = 'affStoreId';
  const affiliation: KEmployees = 'affiliation';
  const role : KEmployees = '役職';
  const cocosumo: EmpAffiliations = 'ここすも';

  const storeMgrQuery =  [
    `${keyStoreId} in ("${storeId}")`,
    `${affiliation} in ("${cocosumo}")`,
    `${role} in ("店長")`,
  ].join(' and ');



  const accountingQuery = [
    `${role} in ("経理")`,
    `${affiliation} in ("${cocosumo}")`,
  ].join(' and ');

  const finalQuery = [
    `(${storeMgrQuery})`,
    `(${accountingQuery})`,
  ].join(' or ');

  const { records } = await getRecords<RecordType>({
    app: appId,
    query: `${finalQuery} order by ${role} asc`,
  });


  if (!records.length) throw new Error(`確認者の情報取得ができませんでした。店舗番号：${storeId}`);
  if (records.length !== 2) throw new Error(`確認者２名が、${records.length}名取得しました。店舗番号：${storeId}`);

  return {
    storeMgr: records[0],
    accounting: records[1],
  };

};
