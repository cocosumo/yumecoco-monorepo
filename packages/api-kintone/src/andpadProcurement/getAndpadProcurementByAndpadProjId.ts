import { getRecords } from '../common';
import { RecordKey, RecordType, appId } from './config';

export const getAndpadProcurementByAndpadProjId = async (systemId: string | number) => {
  const idField: RecordKey = 'andpadProjId';
  const query = `${idField}="${systemId}"`;

  return getRecords<RecordType>({
    app: appId,
    query,
  }).then(({ records }) => records);
};