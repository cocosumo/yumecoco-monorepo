
import { ktRecord } from '../client';
import { appId, RecordType } from './config';



export const getAllStores = async (
  query = 'sortNumber > 0 order by sortNumber desc',
) => {
  return (await ktRecord()).getRecords({
    app: appId, 
    query, 
  }).then(({ records }) => records as unknown as RecordType[]);
};
