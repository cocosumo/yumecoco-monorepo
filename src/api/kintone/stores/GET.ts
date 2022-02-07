import { APP_ID } from './config';
import { KintoneRecord } from '../config';

export const getAllStores = async () => {
  return KintoneRecord.getAllRecords({ app: APP_ID });
};


export const getStoresAsOptions = async () => (await getAllStores()).map(({ $id, 店舗名 }) => ({ value: $id?.value as string || '', label: 店舗名?.value as string || '' }));