

import { ktRecord } from 'api-kintone';
import { AppIds } from 'config';
import { IStores } from 'types';



export const getAllStoresMeeting = async () => {
  return (await ktRecord()).getRecords({
    app: AppIds.stores, 
    query: 'meetingNumber > 0 order by meetingNumber desc', 
  }).then(({ records }) => records as unknown as IStores[]);
};
