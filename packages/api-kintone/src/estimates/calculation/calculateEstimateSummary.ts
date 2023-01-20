import { calcProfitRate } from './calcProfitRate';
import { calculateEstimateRow } from './calculateEstimateRow';

export interface EstimateSummary {
  /** 原価合計 */
  totalCostPrice: number

  /** 粗利 */
  totalProfit: number,

  /** 税抜き金額 */
  totalAmountBeforeTax: number

  /** 税込み金額 */
  totalAmountAfterTax: number
}

export interface CompleteEstimateSummary extends EstimateSummary {
  /** 粗利率 */
  overallProfitRate: number,

  /** 税額 */
  totalTaxAmount: number,
}

export const calculateEstimateSummary = (
  calculatedEstimateTable : ReturnType<typeof calculateEstimateRow>[],
) : CompleteEstimateSummary => {

  const summary = calculatedEstimateTable
    .reduce((acc, cur) => {
      const {
        rowUnitPriceAfterTax,
        rowUnitPriceBeforeTax,
        rowCostPrice,
        rowProfit,
      } = cur;

      acc.totalAmountAfterTax += rowUnitPriceAfterTax;
      acc.totalAmountBeforeTax += rowUnitPriceBeforeTax;
      acc.totalCostPrice += rowCostPrice;
      acc.totalProfit += rowProfit;

      return acc;

    }, {
      totalAmountBeforeTax: 0,
      totalAmountAfterTax: 0,
      totalCostPrice: 0,
      totalProfit: 0,
    } as EstimateSummary );

  const {
    totalCostPrice,
    totalAmountAfterTax,
    totalAmountBeforeTax,

  } = summary;

  return {
    ...summary,
    totalTaxAmount: totalAmountAfterTax - totalAmountBeforeTax,
    overallProfitRate:  calcProfitRate(totalCostPrice, totalAmountBeforeTax),
  };


};