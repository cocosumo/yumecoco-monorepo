import Big from 'big.js';
import { calcProfitRate } from './calcProfitRate';
import { calcAfterTax } from './calcTax';
import { convertToHalfWidth } from 'libs';

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

interface EstRowFields {
  rowUnitPriceBeforeTax: number,
  rowCostPrice: number,
  isTaxable: boolean,
}

export const calculateEstimateSummary = (
  calculatedEstimateTable : EstRowFields[],
  /** 税率 Formwide taxrate (decimal) **/
  taxRate : number,
) : CompleteEstimateSummary => {

  /* 税率が行ごとに異なる仕様になると (10%や8%など)、
  税率ごとに区分して合計した対価の額および適用税率に改修 */

  const summary = calculatedEstimateTable
    .reduce((acc, cur) => {
      const {
        rowUnitPriceBeforeTax,
        rowCostPrice,
        isTaxable,
      } = cur;

      const normalizedRowUnitPriceBeforeTax = +convertToHalfWidth(rowUnitPriceBeforeTax);

      if (isTaxable) {
        acc.totalTaxableAmount = Big(acc.totalTaxableAmount)
          .add(normalizedRowUnitPriceBeforeTax)
          .toNumber();
      } else {
        acc.totalNonTaxableAmount = Big(acc.totalNonTaxableAmount)
          .add(normalizedRowUnitPriceBeforeTax)
          .toNumber();
      }

      acc.totalCostPrice = Big(acc.totalCostPrice)
        .add(rowCostPrice)
        .toNumber();

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

  const totalAmountBeforeTax = Big(totalTaxableAmount).add(totalNonTaxableAmount)
    .round(0)
    .toNumber();
  const totalAmountAfterTax = Big(totalTaxableAmountWithTax).add(totalNonTaxableAmount)
    .round(0)
    .toNumber() ;

  return {
    ...summary,
    totalAmountBeforeTax,
    totalAmountAfterTax,
    totalTaxAmount:  totalAmountAfterTax - totalAmountBeforeTax,
    totalProfit: totalAmountBeforeTax - totalCostPrice,
    overallProfitRate:  calcProfitRate(totalCostPrice, totalAmountBeforeTax),
  };


};