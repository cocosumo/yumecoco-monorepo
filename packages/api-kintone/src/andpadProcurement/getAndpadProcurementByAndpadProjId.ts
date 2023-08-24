import { getRecords } from '../common';
import { RecordKey, RecordType, appId } from './config';


/** 対象のシステムIDの発注一覧を取得する */
export const getAndpadProcurementByAndpadProjId = async (systemId: string | number) => {
  const idField: RecordKey = 'andpadProjId';
  const query = `${idField}="${systemId}"`;

  return getRecords<RecordType>({
    app: appId,
    query,
  }).then(({ records }) => records);
};
