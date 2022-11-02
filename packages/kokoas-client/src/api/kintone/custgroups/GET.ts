import { ICustgroups } from 'types';
import {  APPIDS, KintoneRecord } from './../config';



export interface AdvancedSearchCustGroupParam {
  storeId?: string,
  custName?: string,
  limit?: string,
  offset?: string,
}

/** @deprecated ファイル構成ルール変更によります。./getCustGroupById に変更してください */
export const getCustGroup = (id: string) => {
  return KintoneRecord.getRecord({ app: APPIDS.custGroup, id })
    .then(resp => resp.record as unknown as ICustgroups );
};

/**
 * Search customer by name
 *
 * @param searchStr
 * @returns {Record}
 */
export const searchCustGroup = (searchStr: string) => {

  return KintoneRecord.getRecords({
    app: APPIDS.custGroup,
    query: `${'customerName'} like "${searchStr}"`,
  });
};



