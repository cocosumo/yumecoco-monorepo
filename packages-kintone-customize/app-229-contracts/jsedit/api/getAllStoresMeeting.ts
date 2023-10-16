

import { ktRecord } from 'api-kintone';
import { AppIds } from 'config';
import { IStores } from 'types';

/**
 * 店舗の順番 ：会議資料用
 * @returns 豊田、大林、美里、高浜・・・
**/

export const getAllStoresMeeting = async () => {
  return (await ktRecord()).getRecords({
    app: AppIds.stores, 
    query: 'meetingNumber > 0 order by meetingNumber desc', 
  }).then(({ records }) => records as unknown as IStores[]);
};
