import { CalculationEstimateResults, CompleteEstimateSummary } from 'api-kintone';


interface EstimatesList {
  projId: string,
  projTypeName: string,
  dataId: string,
  amountPerContract: string,
  amountType: string,
  isForPayment: boolean,
  estimateId: string,
}


/**
 * 工事番号ごとに配列を分割する処理
 * @param estimates 
 */
export const estimatesSort = ({
  records,
  calculated,
}: {
  records: DBProjestimates.SavedData[]
  calculated: {
    details: CalculationEstimateResults[] | undefined;
    summary: CompleteEstimateSummary;
  }[];
}) => {

  /* データの再構成 */
  const estimatesCopy = records.reduce((acc, cur, idx) => {

    const newData = {
      projId: cur.projId.value,
      projTypeName: cur.工事種別名.value,
      dataId: cur.dataId.value || '',
      amountPerContract: String(calculated[idx].summary.totalAmountAfterTax),
      amountType: '',
      isForPayment: !!(+cur.isForPayment.value),
      estimateId: cur.uuid.value,
    };

    acc.push(newData);

    return acc;

  }, [] as EstimatesList[]);

  /* 見積もりを枝番号でソートする */
  const estimatesBkup = estimatesCopy.sort((a, b) => {
    return a.dataId < b.dataId ? -1 : 1;
  });

  return estimatesBkup;
};