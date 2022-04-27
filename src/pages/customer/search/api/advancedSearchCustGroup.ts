import { KintoneRecord, APPIDS } from '../../../../api/kintone';

export interface AdvancedSearchCustGroupParam {
  storeId?: string,
  custName?: string,
}
export const advancedSearchCustGroup = async <
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


  return KintoneRecord.getRecords({
    app: APPIDS.custGroup,
    query: [
      (query ?? ''),
      `order by ${'更新日時' as Key}`,
    ].join(' '),
    totalCount: true,
  });

};