import { calculateAmount } from './calculateAmount';

interface ICalculateRowAmount {
  
  /** 原価 */
  costPrice?: number,

  /** 数量 */
  quantity: number,
 
  /** 利益率 0% 100% decimal*/
  profitRate?: number,
 
  /** 単価 */
  unitPrice?: number,
 
  /** 税率 0% | 10% decimal*/
  taxRate?: number,

  /** 行の原価合計 */
  rowCostPrice?: number,

  /* 粗利 */
  rowProfit?: number,
  
  /* 行の税額 */
  rowTaxAmount?: number,

  /** 行の税抜き単価合計 */
  rowUnitPriceBeforeTax?: number,
 
  /** 行の税込み単価合計 */
  rowUnitPriceAfterTax?: number,
   
}


/**
 * convenience wrapper for calculateAmount.
 * 
 * This is to centralize calculation logic.
 */
export const calculateRowAmount = (
  p: Partial<Record<keyof ICalculateRowAmount, number | string>>,
): Required<ICalculateRowAmount> => {


  let result = { ...p };

  const {
    taxRate = 0.1,
  } = p;

  if (p.costPrice && p.quantity && p.profitRate) {
    const {
      costPrice: rowCostPrice,
      amountAfterTax: rowUnitPriceAfterTax,
      amountBeforeTax: rowUnitPriceBeforeTax,
      profit: rowProfit,
    } = calculateAmount({
      costPrice: +p.costPrice * +p.quantity,
      profitRate: +p.profitRate,
      taxRate:  +taxRate,
    });

    result = {
      ...result,
      rowProfit,
      rowCostPrice,
      rowUnitPriceBeforeTax,
      rowUnitPriceAfterTax,
      unitPrice: rowUnitPriceBeforeTax / +p.quantity,
    };
  } else if (p.unitPrice && p.costPrice && p.quantity) {
    const {
      amountBeforeTax: rowUnitPriceBeforeTax,
      amountAfterTax: rowUnitPriceAfterTax,
      profitRate: rowProfitRate,
      profit: rowProfit,
    } = calculateAmount({
      costPrice: +p.costPrice * +p.quantity,
      amountBeforeTax: +p.unitPrice * +p.quantity,
    });

    result = {
      ...result,
      rowUnitPriceBeforeTax,
      rowUnitPriceAfterTax,
      profitRate: rowProfitRate,
      rowProfit,
    };
  } else {
    //　網羅的にテスト出来ないため、残す
    console.warn('No calculation perfomed', p);
  }

  return {
    ...result,
    costPrice: +(result.costPrice || 0),
    quantity: +(result.quantity || 0),
    profitRate: +(result.profitRate || 0),
    unitPrice: +(result.unitPrice || 0),
    taxRate: +(result.taxRate || 0),
    rowCostPrice: +(result.rowCostPrice || 0),
    rowProfit: +(result.rowProfit || 0),
    rowTaxAmount: +(result.rowTaxAmount || 0),
    rowUnitPriceBeforeTax: +(result.rowUnitPriceBeforeTax || 0),
    rowUnitPriceAfterTax: +(result.rowUnitPriceAfterTax || 0),

  };

};