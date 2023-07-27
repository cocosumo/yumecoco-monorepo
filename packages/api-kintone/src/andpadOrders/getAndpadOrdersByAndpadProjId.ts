import { getRecords } from '../common';
import { RecordKey, RecordType, appId } from './config';

export const getAndpadOrdersByAndpadProjId = async (andpadProjId: string | number) => {
  const idField: RecordKey = 'andpadProjId';
  const query = `${idField}="${andpadProjId}"`;

  return getRecords<RecordType>({
    app: appId,
    query,
  }).then(({ records }) => records);
};