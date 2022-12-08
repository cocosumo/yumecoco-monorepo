import { getRecords } from '../common';
import { appId, RecordKey, RecordType } from './config';

export const getEmployeesByIds = async (ids: string[]) => {
  const idField : RecordKey = 'uuid';
  const query = ids.map((id) => {
    return `${idField} = "${id}"`;
  }).join(' or ');

  return getRecords<RecordType>({
    app: appId,
    query,
  });
};
