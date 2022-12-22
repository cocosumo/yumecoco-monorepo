import { getRecords } from '../common';
import { appId, RecordKey, RecordType } from './config';

export const getSystemUpdate = async () => {
  const orderByField: RecordKey = 'releaseDate';

  return getRecords<RecordType>({
    app: appId,
    query: `order by ${orderByField} desc limit 1`,
  });
};