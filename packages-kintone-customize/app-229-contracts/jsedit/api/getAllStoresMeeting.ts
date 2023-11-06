

import { ktRecord } from 'api-kintone';
import { AppIds } from 'config';
import { IStores } from 'types';

/**
 * kintoneアプリより"meetingNumber"毎にソートした店舗情報を取得します
 * @returns 店舗情報の配列
**/

export const getAllStoresMeeting = async () => {
  return (await ktRecord()).getRecords({
    app: AppIds.stores, 
    query: 'meetingNumber > 0 order by meetingNumber desc', 
  }).then(({ records }) => records as unknown as IStores[]);
};
