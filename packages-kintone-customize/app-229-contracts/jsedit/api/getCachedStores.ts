import { isEmpty } from 'lodash';
import { IStores } from 'types';
import { getAllStoresMeeting } from './getAllStoresMeeting';

let storeRecords: IStores[] = Object.create(null);


/**
 * キャッシュされた店舗一覧を取得する
 * 
 * キャッシュはメモリ上に保存される
 * @returns 
 */
export const getCachedStores = async () => {
  if (isEmpty(storeRecords)) {
    storeRecords = await getAllStoresMeeting();
  }
  return storeRecords;
};

/**
 * uuid から店舗名を取得する
 * 
 * @param storeId 
 * @returns 
 */
export const getStoreNameById = (storeId: string) => {
  const store = storeRecords.find((s) => s.uuid.value === storeId);
  return store?.店舗名.value ?? '';
};