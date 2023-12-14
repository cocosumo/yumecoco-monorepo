import { ktRecord } from '../client';
import { RecordType, appId } from './config';



export const getInHouseProjTypes = async () => {
  return (await ktRecord()).getRecords({
    app: appId,
    query: 'order by sortNum asc',
  }).then(r => r.records as unknown as RecordType[]);
};
