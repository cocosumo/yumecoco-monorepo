import { APP_ID } from './config';
import { APPIDS, KintoneRecord } from './../config';


interface Result {
  record: CustomerGroupTypes.SavedData
}

export interface AdvancedSearchCustGroupParam {
  storeId?: string,
  custName?: string
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




export const advancedSearchCustGroup = <
  Key extends Partial<keyof CustomerGroupTypes.SavedData>,
  CustKey extends  Partial<keyof CustomerGroupTypes.SavedData['members']['value'][0]['value']>,
>(
    params : AdvancedSearchCustGroupParam,
  ) => {
  const {
    storeId,
    custName,
  } = params;


  const query = [
    ...(storeId ? [`${'storeId' as Key} = "${storeId}"`] : []),
    ...(custName ? [`${'customerName' as CustKey} in ("${custName}")`] : []),
  ]
    .join(' and ');


  return KintoneRecord.getAllRecords({
    app: APPIDS.custGroup,
    condition: query ?? undefined,
    orderBy: '更新日時 desc',
  }) ;

};