


import { roundTo } from 'libs';
import { calcProfitRate } from './calcProfitRate';

/****
 * 計算の仕様
 * https://trello.com/c/9WvDqhV1
 *
 *  A = 原価
 *  B = 粗利（円）
 *  C = 単価
 *  D = 利益率
 *
 * ---------------
 *
 *  C = A / (1 - D )
 *  B = C - A
 *
 * ---------------
 *
 * 逆算
 *
 *  D = (C - A) / C
 *  A = C - CD  //Aは逆算の仕様はないので、JS可不要
 *
 *  C = B + A
 *
 *
 */


/**
 * インプットです
 *
 * Optionalの項目はundefinedで渡されると逆算する
 *
 */
interface CalculationEstimateParams {
  /** 原価 */
  costPrice: number,

  /** 数量 */
  quantity: number,

  /** 利益率 0% 100%*/
  profitRate?: number,

  /** 単価 */
  unitPrice?: number,

  /** 行の税抜き単価合計 */
  rowUnitPriceBeforeTax?: number,

  /** 行の税込み単価合計 */
  rowUnitPriceAfterTax?: number,

  /** 税率 0% | 10% */
  taxRate: number,

  /** 課税かどうか */
  isTaxable: boolean,

}

export interface CalculationEstimateResults extends Required<CalculationEstimateParams> {

  /** 行の原価合計 */
  rowCostPrice : number,

  /** 行の税抜き単価合計 */
  rowUnitPriceBeforeTax: number,

  /* 粗利 */
  rowProfit: number,

}


/****************************
 * 行ごと計算
 *
 * 基本的に逆算してほしい項目をundefinedにする。
 *
 ****************************/
export const calculateEstimateRow = ( params : CalculationEstimateParams) : CalculationEstimateResults => {

  const {
    costPrice,
    isTaxable,
    taxRate,
    profitRate = 0,
    unitPrice,
    quantity,
    rowUnitPriceAfterTax,
    rowUnitPriceBeforeTax,
  } = params;

  // 行の原価合計 = A * 数量
  const rowCostPrice = Math.round(costPrice * quantity);


  /******************************
   * Edge case：計算不要なケース *
  *******************************/
  if (
    +quantity === 0 //  数量がない場合、計算不要
    || profitRate >= 1 // 今の計算の仕様では、利益率が100％以上だと、変な数字になるので、計算不要
  ) {

    return {
      ...params,
      rowProfit: 0,
      profitRate: roundTo(profitRate, 4),
      rowCostPrice,
      unitPrice: 0,
      rowUnitPriceBeforeTax: 0,
      rowUnitPriceAfterTax: 0,
    };
  }

  /********************************************************************************
   *「税抜き単価合計」を編集されたら、「C 単価」と「税抜き単価合計」と「D 利益率」を逆算 *
   *******************************************************************************/
  if (rowUnitPriceBeforeTax && !unitPrice && !profitRate) {

    const newRowUnitAfterTax = isTaxable ? rowUnitPriceBeforeTax * (1 + taxRate) :  rowUnitPriceBeforeTax;


    // C 単価
    const newUnitPrice = rowUnitPriceBeforeTax / quantity;

    /** D = ( C - A) / C */
    const newProfitRate =  calcProfitRate(costPrice, newUnitPrice);

    /** B  行の粗利合計  =  C 行の税抜き単価合計 - A 行の原価合計  */
    const newRowProfit = rowUnitPriceBeforeTax - rowCostPrice;

    console.log(rowUnitPriceBeforeTax, rowCostPrice, newRowProfit);

    return {
      ...params,
      rowCostPrice: Math.round(rowCostPrice),
      rowProfit: Math.round(newRowProfit),
      rowUnitPriceAfterTax: roundTo(newRowUnitAfterTax, 2),
      rowUnitPriceBeforeTax: Math.round(rowUnitPriceBeforeTax),
      unitPrice: Math.round(newUnitPrice),
      profitRate: roundTo(newProfitRate, 4),

    };
  }

  /********************************************************************************
   *「税込み単価合計」を編集されたら、「C 単価」と「税抜き単価合計」と「D 利益率」を逆算 *
   *******************************************************************************/
  if (rowUnitPriceAfterTax && !unitPrice && !profitRate) {

    // 税抜き単価合計
    const newRowUnitPriceBeforeTax = isTaxable ? (rowUnitPriceAfterTax / (1 + taxRate))  : rowUnitPriceAfterTax;

    // C 単価
    const newUnitPrice = newRowUnitPriceBeforeTax / quantity;

    /** D = ( C - A) / C */
    const newProfitRate =  calcProfitRate(costPrice, newUnitPrice);

    /** B  行の粗利合計  =  C 行の税抜き単価合計 - A 行の原価合計  */
    const newRowProfit = newRowUnitPriceBeforeTax - rowCostPrice;

    return {
      ...params,
      rowCostPrice: Math.round(rowCostPrice),
      rowProfit: Math.round(newRowProfit),
      rowUnitPriceAfterTax: Math.round(rowUnitPriceAfterTax),
      rowUnitPriceBeforeTax: Math.round(newRowUnitPriceBeforeTax),
      unitPrice: Math.round(newUnitPrice),
      profitRate: roundTo(newProfitRate, 4),

    };
  }

  /**********************************************************************************
   * C 「単価」を編集されたら、「税込み単価合計」と 「「税抜き単価合計」と「D 利益率」を逆算 *
  **********************************************************************************/

  if (unitPrice !== undefined && +unitPrice > 0 && !rowUnitPriceAfterTax && !profitRate) {

    // 税抜き単価合計
    const newRowUnitPriceBeforeTax = unitPrice * quantity;

    // 税込み単価合計
    const newrowUnitPriceAfterTax = isTaxable ? (newRowUnitPriceBeforeTax * (1 + taxRate)) : newRowUnitPriceBeforeTax;

    // D 利益率
    const newProfitRate = calcProfitRate(costPrice, unitPrice);

    // B  行の粗利合計  =  C 行の税抜き単価合計 - A 行の原価合計
    const newRowProfit = newRowUnitPriceBeforeTax - rowCostPrice;


    return {
      ...params,
      rowProfit: newRowProfit,
      rowCostPrice: Math.round(rowCostPrice),
      unitPrice: Math.round(unitPrice),
      rowUnitPriceBeforeTax: Math.round(newRowUnitPriceBeforeTax),
      rowUnitPriceAfterTax: Math.round(newrowUnitPriceAfterTax),
      profitRate: roundTo(newProfitRate, 4),
    };
  }

  /*******
   * 通常 *
  **********/

  // C 単価  = A / (1 - D)
  const newUnitPrice = costPrice / (1 - profitRate);

  // 税抜き単価合計
  const newRowUnitPriceBeforeTax = newUnitPrice * quantity;

  // 税込み単価合計
  const newRowUnitPriceAfterTax = isTaxable ? (newRowUnitPriceBeforeTax * (1 + taxRate)) : newRowUnitPriceBeforeTax;

  // B  行の粗利合計  =  C 行の税抜き単価合計 - A 行の原価合計
  const newRowProfit =  newRowUnitPriceBeforeTax - rowCostPrice;


  return {
    ...params,
    rowProfit: newRowProfit,
    profitRate: roundTo(profitRate, 4),
    rowCostPrice: Math.round(rowCostPrice),
    unitPrice: Math.round(newUnitPrice),
    rowUnitPriceBeforeTax: Math.round(newRowUnitPriceBeforeTax),
    rowUnitPriceAfterTax: Math.round(newRowUnitPriceAfterTax),
  };

};