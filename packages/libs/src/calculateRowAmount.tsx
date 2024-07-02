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

  const resolvedQuantity = Number(p.quantity);

  if (p.unitPrice && p.costPrice && !resolvedQuantity) {


    const {
      profitRate: rowProfitRate,
      profit: rowProfit,
    } = calculateAmount({
      amountBeforeTax: +p.unitPrice,
      costPrice: +p.costPrice,
    });

    result = {
      ...result,
      rowCostPrice: 0,
      rowUnitPriceBeforeTax: 0,
      rowUnitPriceAfterTax: 0,
      profitRate: rowProfitRate,
      rowProfit,
    };
  } else if (p.costPrice && p.profitRate && !resolvedQuantity) {

    const {
      amountBeforeTax: rowUnitPriceBeforeTax,
      profit: rowProfit,
    } = calculateAmount({
      costPrice: +p.costPrice,
      profitRate: +p.profitRate,
      taxRate:  +taxRate,
    });

    result = {
      ...result,
      unitPrice: rowUnitPriceBeforeTax,
      rowUnitPriceBeforeTax: 0,
      rowUnitPriceAfterTax: 0,
      rowProfit,
    };
  } else if (p.costPrice && resolvedQuantity && p.profitRate) {

    const {
      costPrice: rowCostPrice,
      amountAfterTax: rowUnitPriceAfterTax,
      amountBeforeTax: rowUnitPriceBeforeTax,
      profit: rowProfit,
    } = calculateAmount({
      costPrice: +p.costPrice * resolvedQuantity,
      profitRate: +p.profitRate,
      taxRate:  +taxRate,
    });

    result = {
      ...result,
      rowProfit,
      rowCostPrice,
      rowUnitPriceBeforeTax,
      rowUnitPriceAfterTax,
      unitPrice: rowUnitPriceBeforeTax / resolvedQuantity,
    };
  } else if (p.unitPrice && p.costPrice && p.quantity) {
    
    const {
      amountBeforeTax: rowUnitPriceBeforeTax,
      amountAfterTax: rowUnitPriceAfterTax,
      profitRate: rowProfitRate,
      profit: rowProfit,
      costPrice: rowCostPrice,
    } = calculateAmount({
      costPrice: +p.costPrice * resolvedQuantity,
      amountBeforeTax: +p.unitPrice * resolvedQuantity,
    });

    result = {
      ...result,
      rowCostPrice,
      rowUnitPriceBeforeTax,
      rowUnitPriceAfterTax,
      profitRate: rowProfitRate,
      rowProfit,
    };
  } else if (p.unitPrice && p.quantity && !p.costPrice ) { 


    const {
      amountBeforeTax: rowUnitPriceBeforeTax,
      amountAfterTax: rowUnitPriceAfterTax,
      profitRate: rowProfitRate,
      profit: rowProfit,
      costPrice: rowCostPrice,
    } = calculateAmount({
      amountBeforeTax: +p.unitPrice * resolvedQuantity,
      costPrice: 0,
    });

    result = {
      ...result,
      rowCostPrice,
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