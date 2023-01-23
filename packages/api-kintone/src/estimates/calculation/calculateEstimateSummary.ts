import Big from 'big.js';
import { calcProfitRate } from './calcProfitRate';
import { calcAfterTax } from './calcTax';
import { calculateEstimateRow } from './calculateEstimateRow';

export interface EstimateSummary {
  /** 原価合計 */
  totalCostPrice: number

  /** 粗利 */
  totalProfit: number,

  /** 税額 */
  totalTaxAmount: number,

  /**  */
  totalTaxableAmount: number,

  /** */
  totalNonTaxableAmount: number,
}

export interface CompleteEstimateSummary extends EstimateSummary {
  /** 粗利率 */
  overallProfitRate: number,


  /* 税抜き */
  totalAmountBeforeTax: number,

  /* 税込み */
  totalAmountAfterTax: number,


  /** 税額 */
  totalTaxAmount: number,
}

export const calculateEstimateSummary = (
  calculatedEstimateTable : ReturnType<typeof calculateEstimateRow>[],
  taxRate = 0.1,   // 仮税率、実際は各フィールドから取得します。
) : CompleteEstimateSummary => {

  const summary = calculatedEstimateTable
    .reduce((acc, cur) => {
      const {
        rowUnitPriceBeforeTax,
        rowCostPrice,
        isTaxable,
      } = cur;

      if (isTaxable) {
        acc.totalTaxableAmount += rowUnitPriceBeforeTax;
      } else {
        acc.totalNonTaxableAmount += rowUnitPriceBeforeTax;
      }

      acc.totalCostPrice += rowCostPrice;

      return acc;

    }, {
      totalNonTaxableAmount: 0,
      totalTaxableAmount: 0,
      totalCostPrice: 0,
      totalProfit: 0,
      totalTaxAmount: 0,
    } as EstimateSummary );

  const {
    totalCostPrice,
    totalTaxableAmount,
    totalNonTaxableAmount,
  } = summary;


  const totalTaxableAmountWithTax = calcAfterTax(totalTaxableAmount, taxRate);

  const totalAmountBeforeTax = Big(totalTaxableAmount).add(totalNonTaxableAmount).round(0).toNumber();
  const totalAmountAfterTax = Big(totalTaxableAmountWithTax).add(totalNonTaxableAmount).round(0).toNumber() ;

  console.log(totalTaxableAmount, totalTaxableAmountWithTax);

  return {
    ...summary,
    totalAmountBeforeTax,
    totalAmountAfterTax,
    totalTaxAmount:  totalAmountAfterTax - totalAmountBeforeTax,
    totalProfit: totalAmountBeforeTax - totalCostPrice,
    overallProfitRate:  calcProfitRate(totalCostPrice, totalAmountBeforeTax),
  };


};