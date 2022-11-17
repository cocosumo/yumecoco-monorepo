
import { ktRecord } from '../client';
import { appId, RecordType } from './config';



export const getAllStores = async () => {
  return (await ktRecord()).getRecords({
    app: appId, 
    query: 'sortNumber > 0 order by sortNumber desc', 
  }).then(({ records }) => records as unknown as RecordType[]);
};
