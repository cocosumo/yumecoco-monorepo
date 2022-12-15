import { EstimateList, useContractsByCustGroupId } from 'kokoas-client/src/hooksQuery';


interface EstimatesList {
  projId: string,
  projTypeName: string,
  dataId: string,
  contractAmount: number,
  billedAmount: number,
  billingAmount: number,
  isForPayment: boolean,
  estimateId: string,
}


/**
 * 工事番号ごとに配列を分割する処理
 * @param estimates 
 */
export const estimatesSort = (
  contracts: ReturnType<typeof useContractsByCustGroupId>['data'],
  totalInvoice: EstimateList[] | undefined,
) => {

  const { records, calculated } = contracts || {};

  
  /* データの再構成 */
  const estimatesCopy = records?.reduce((acc, cur, idx) => {

    const invoiceDat = totalInvoice?.reduce((invAcc, invCur) => {
      if (invCur.dataId !== cur.dataId.value) return invAcc;
      return invAcc + +invCur.billedAmount;
    }, 0) ?? 0;

    const contractAmount = calculated?.[idx].summary.totalAmountAfterTax ?? 0;

    const newData: EstimatesList = {
      projId: cur.projId.value,
      projTypeName: cur.工事種別名.value,
      dataId: cur.dataId.value || '',
      contractAmount: contractAmount,
      billedAmount: invoiceDat,
      billingAmount: contractAmount - invoiceDat,
      isForPayment: !!(+cur.isForPayment.value),
      estimateId: cur.uuid.value,
    };

    acc.push(newData);

    return acc;

  }, [] as EstimatesList[]);

  /* 見積もりを枝番号でソートする */
  const estimatesBkup = estimatesCopy?.sort((a, b) => {
    return a.dataId < b.dataId ? -1 : 1;
  });

  return estimatesBkup;
};