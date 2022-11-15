export const contractAmount = (
  records: DBProjestimates.SavedData[] | undefined,
  calculated: { totalProfit: number; totalProfitRate: number; taxAmount: number; totalCostPrice: number; totalCPWithProfit: number; totalAmountInclTax: number; materials: { costPrice: number; quantity: number; materialProfit: number; rowUnitPrice: number; rowTotalAmountInclTax: number; }[]; }[] | undefined, // typeof getEstimatesByProjId<typeof calculated>[] | undefined,
) => {

  return records?.reduce((acc, cur, idx) => {
    // 未契約の見積もり or 除外する場合
    if (!cur.envStatus.value) return acc;
    // if (estimates?.[idx].isForPayment ?? '') return acc;

    /* 既に入金済みの金額は差し引く */
    return acc + (calculated?.[idx].totalAmountInclTax ?? 0);
  }, 0);
};