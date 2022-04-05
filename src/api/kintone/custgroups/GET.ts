import { APP_ID } from './config';
import { KintoneRecord } from './../config';


interface Result {
  record: CustomerGroupTypes.SavedData
}

export const getCustGroup = (id: string) => {
  return KintoneRecord.getRecord({ app: APP_ID, id }) as unknown as  Promise<Result>;
};

/**
 * Search customer by name
 *
 * @param searchStr
 * @returns {Record}
 */
export const searchCustGroup = (searchStr: string) => {
  console.log(searchStr, 'searchString');
  return KintoneRecord.getRecords({
    app: APP_ID,
    query: `${'customerName'} like "${searchStr}"`,
  });
};