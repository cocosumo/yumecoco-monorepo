import { getRecords } from '../common';
import { RecordKey, RecordType, appId } from './config';


/** 対象のシステムIDの発注一覧を取得する */
export const getAndpadProcurementByAndpadProjId = async (systemId: string | number) => {
  const idField: RecordKey = 'andpadProjId';
  const deletedField: RecordKey = 'deletedState';
  const query = [
    `${idField} = "${systemId}"`,
    `${deletedField} != "削除済"`,
  ].join(' and ');

  return getRecords<RecordType>({
    app: appId,
    query,
  }).then(({ records }) => records);
};
