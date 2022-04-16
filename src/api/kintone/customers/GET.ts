import { APP_ID } from './config';
import { KintoneRecord } from './../config';

export const getAllCustomers = () => {
  return KintoneRecord.getAllRecords({ app: APP_ID });
};

export const getCustomersByIds = (ids: string[]) => {
  const query = ids.map((id) => `$id = "${id}" `).join(' or ') + ' order by index asc';
  
  return KintoneRecord.getRecords({
    app: APP_ID,
    query,
  });
};

export const getCustomerById = (id: string) =>  KintoneRecord
  .getRecord({
    app: APP_ID,
    id,
  });


export const searchCustomers = (searchStr: string) => {
  console.log(`${'fullName' as keyof CustomerTypes.SavedData} like ${searchStr}`);
  return KintoneRecord.getRecords({
    app: APP_ID,
    query: `${'fullName'} like "${searchStr}"`,
  });
};