import { APP_ID } from './config';
import {  KintoneRecord } from './../config';



export interface AdvancedSearchCustGroupParam {
  storeId?: string,
  custName?: string,
  limit?: string,
  offset?: string,
}

export const getCustGroup = (id: string) => {
  return KintoneRecord.getRecord({ app: APP_ID, id });
};

/**
 * Search customer by name
 *
 * @param searchStr
 * @returns {Record}
 */
export const searchCustGroup = (searchStr: string) => {

  return KintoneRecord.getRecords({
    app: APP_ID,
    query: `${'customerName'} like "${searchStr}"`,
  });
};



