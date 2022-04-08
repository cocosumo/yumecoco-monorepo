import { APP_ID } from './config';
import { APPIDS, KintoneRecord } from './../config';


interface Result {
  record: CustomerGroupTypes.SavedData
}

export interface AdvancedSearchCustGroupParam {
  storeId?: string
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

  return KintoneRecord.getRecords({
    app: APP_ID,
    query: `${'customerName'} like "${searchStr}"`,
  });
};




export const advancedSearchCustGroup = <Key extends Partial<keyof CustomerGroupTypes.SavedData>>(params : AdvancedSearchCustGroupParam) => {
  const {
    storeId,
  } = params;

  console.log('storeId', storeId);

  return KintoneRecord.getAllRecords({
    app: APPIDS.custGroup,
    condition: [
      `${'storeId' as Key} = "${storeId}"`,
    ].join(' and '),
    orderBy: '更新日時 desc',
  });

};