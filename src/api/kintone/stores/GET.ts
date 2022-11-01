import { APP_ID } from './config';
import { KintoneRecord } from './../config';



export const getAllStores  = async (params ?: GetRecordParams) => {
  return KintoneRecord.getRecords({ app: APP_ID, fields: params?.fields, query: params?.query  });
};


export const getStoresAsOptions = async () : Promise<Options> => (await getAllStores({
  fields : ['$id', '店舗名', 'territory'],
  query : 'sortNumber > 0 order by sortNumber desc',
}))
  .records
  .map(({ $id, 店舗名, territory }) => ({
    value: $id?.value as string || '',
    label: 店舗名?.value as string || '',
    secondaryLabel: territory.value as string,
  }));