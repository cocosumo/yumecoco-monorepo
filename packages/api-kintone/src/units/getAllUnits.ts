
import { ktRecord } from '../client';
import { appId, RecordType } from './config';



export const getAllUnits = async () => {
  return (await ktRecord()).getRecords({
    app: appId, 
    query: 'order by $id asc', 
  }).then(({ records }) => records as unknown as RecordType[]);
};
