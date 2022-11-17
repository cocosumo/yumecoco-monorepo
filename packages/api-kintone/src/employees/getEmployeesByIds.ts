import { getRecords } from '../common';
import { appId, RecordType } from './config';

export const getEmployeesByIds = async (ids: string[]) => {
  const query = ids.map((id) => {
    return `$id = "${id}"`;
  }).join(' or ');

  return getRecords<RecordType>({
    app: appId,
    query,
  });
};
