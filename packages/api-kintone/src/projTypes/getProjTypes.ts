import { ktRecord } from '../client';
import { appId, RecordType } from './config';

export const getProjTypes = async () => {
  return (await ktRecord()).getRecords({
    app: appId,
    query: 'order by レコード番号 asc',
  }).then(r => r.records as unknown as RecordType[]);
};