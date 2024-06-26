import { Big } from 'big.js';
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

  /** 課税対象総額 */
  totalTaxableAmount: number,

  /** 非課税対象総額 */
  totalNonTaxableAmount: number,

  /** 割引額 */
  totalDiscountAmount: number,

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
  
  /** 非割引額 */
  totalAmountBeforeDiscount: number,
}

export interface EstRowFields {
  rowUnitPriceBeforeTax: number,
  rowCostPrice: number,
  isTaxable: boolean,
  quantity: number,
}

export const calculateEstimateSummary = (
  calculatedEstimateTable : EstRowFields[],
  /** 税率 Formwide taxrate (decimal) **/
  taxRate : number,
) : CompleteEstimateSummary => {

  /* 税率が行ごとに異なる仕様になると (10%や8%など)、
  税率ごとに区分して合計した対価の額および適用税率に改修 */

  const summary = calculatedEstimateTable
    .reduce<EstimateSummary>(
    (acc, cur) => {
      const {
        quantity,
        rowUnitPriceBeforeTax,
        rowCostPrice,
        isTaxable,
      } = cur;

      if (!+quantity) return acc;
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

      if (normalizedRowUnitPriceBeforeTax < 0) {
        acc.totalDiscountAmount = Big(acc.totalDiscountAmount)
          .plus(normalizedRowUnitPriceBeforeTax)
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
      totalDiscountAmount: 0,
    }, 
  );

  const {
    totalCostPrice,
    totalTaxableAmount,
    totalNonTaxableAmount,
    totalDiscountAmount,
  } = summary;

  const totalTaxableAmountWithTax = calcAfterTax(totalTaxableAmount, taxRate);

  const totalAmountBeforeTax = Big(totalTaxableAmount)
    .add(totalNonTaxableAmount)
    .round(0)
    .toNumber();
  const totalAmountAfterTax = Big(totalTaxableAmountWithTax)
    .add(totalNonTaxableAmount)
    .round(0)
    .toNumber() ;

  return {
    ...summary,
    totalAmountBeforeTax,
    totalAmountAfterTax,
    totalTaxAmount:  Big(totalAmountAfterTax)
      .minus(totalAmountBeforeTax)
      .toNumber(),
    totalProfit: Big(totalAmountBeforeTax)
      .minus(totalCostPrice)
      .toNumber(),
    overallProfitRate:  calcProfitRate(totalCostPrice, totalAmountBeforeTax),
    totalAmountBeforeDiscount: Big(totalAmountBeforeTax)
      .minus(totalDiscountAmount)
      .toNumber(),
  };


};