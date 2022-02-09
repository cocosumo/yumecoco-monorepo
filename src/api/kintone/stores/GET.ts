import { APP_ID, KintoneRecord } from './config';




export const getAllStores  = async (params ?: GetRecordParams) => {
  return KintoneRecord.getRecords({ app: APP_ID, fields: params?.fields, query: params?.query  });
};


export const getStoresAsOptions = async () => (await getAllStores({ 
  fields : ['$id', '店舗名'], 
  query : `isStore = ${+true}`,
}))
  .records
  .map(({ $id, 店舗名 }) => ({ value: $id?.value as string || '', label: 店舗名?.value as string || '' }));