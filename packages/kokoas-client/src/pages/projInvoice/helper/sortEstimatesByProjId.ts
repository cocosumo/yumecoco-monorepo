import { calculateEstimateRecord } from 'api-kintone';


/**
 * 工事番号ごとに配列を分割する処理
 * @param estimates 
 */
export const sortEstimatesByProjId = ({
  records,
  calculated,
}: {
  records: DBProjestimates.SavedData[]
  calculated: ReturnType<typeof calculateEstimateRecord>[];
}) => {

  /* データの再構成 */
  const convertedEstimates = records.map((cur, idx) => {

    return {
      projId: cur.projId.value,
      projTypeName: cur.工事種別名.value,
      dataId: cur.dataId.value || '',
      amountPerContract: String(calculated[idx].summary.totalAmountAfterTax),
      amountType: '',
      isForPayment: !!(+cur.isForPayment.value),
      estimateId: cur.uuid.value,
    };

  });

  /* 見積もりを枝番号でソートする */
  return convertedEstimates.sort((a, b) => {
    return a.dataId < b.dataId ? -1 : 1;
  });
};