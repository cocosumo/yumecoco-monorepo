import { getRecords } from '../common';
import { appId, RecordType, RecordKey } from './config';

export const getCustomersByIds = async (ids : string[]) => {

  const idField: RecordKey = 'uuid';
  const query = ids.map((id) => `${idField} = "${id}" `).join(' or ') + ' order by index asc';

  return getRecords<RecordType>({
    app: appId,
    query,
  }).then(({ records }) => records);
};