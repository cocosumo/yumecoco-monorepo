


import { calcProfitRate } from './calcProfitRate';
import { Big } from 'big.js';
import { calcAfterTax, calcBeforeTax } from './calcTax';

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

  /** 利益率 0% 100% decimal*/
  profitRate?: number,

  /** 単価 */
  unitPrice?: number,

  /** 行の税抜き単価合計 */
  rowUnitPriceBeforeTax?: number,

  /** 行の税込み単価合計 */
  rowUnitPriceAfterTax?: number,

  /** 税率 0% | 10% decimal*/
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

  /* 行の税額 */
  rowTaxAmount: number,

}


/****************************
 * 行ごと計算
 *
 * 基本的に逆算してほしい項目をundefinedにする。
 *
 * 頭に `b` が付いている変数は、Big型です。
 ****************************/
export const calculateEstimateRow = (params : CalculationEstimateParams) : CalculationEstimateResults => {

  const result : Partial<CalculationEstimateResults> = {
    ...params,
  };



  /* 行の原価合計 */
  result.rowCostPrice = Big(params.costPrice).mul(params.quantity).round(0).toNumber();


  /* 単価 */
  if (params.profitRate && result.costPrice) {
    // 1 - D
    const bProfitRate = Big(1).minus(params.profitRate).toNumber();

    // 原価 / (1 - D)
    result.unitPrice = Big(params.costPrice).div(bProfitRate).round(0).toNumber();
  }

  /* 行の単価合計(税抜き)、行の単価合計(税込み) */
  if (result.unitPrice) {
    // 単価 * 数量
    result.rowUnitPriceBeforeTax = Big(result.unitPrice).mul(params.quantity).round(0).toNumber();
    result.rowUnitPriceAfterTax = calcAfterTax(result.rowUnitPriceBeforeTax, params.taxRate, params.isTaxable);
  }

  /* 行の単価合計(税込み)、 単価 */
  if (params.rowUnitPriceBeforeTax) {

    result.rowUnitPriceAfterTax = calcAfterTax(params.rowUnitPriceBeforeTax, params.taxRate, params.isTaxable);
    result.unitPrice = Big(params.rowUnitPriceBeforeTax / params.quantity).round(0).toNumber();
  }

  /* 行の単価合計(税抜き)、単価 */
  if (params.rowUnitPriceAfterTax) {
    result.rowUnitPriceBeforeTax = calcBeforeTax(params.rowUnitPriceAfterTax, params.taxRate, params.isTaxable);
    result.unitPrice = Big(result.rowUnitPriceBeforeTax / params.quantity).round(0).toNumber();
  }

  /* 行の税額 */
  if (result.rowUnitPriceAfterTax && result.rowUnitPriceBeforeTax ) {
    result.rowTaxAmount = Big(result.rowUnitPriceAfterTax).minus(result.rowUnitPriceBeforeTax).round(0).toNumber();
  }

  /* 行の利益率, 行の利益額*/
  if (result.rowUnitPriceBeforeTax && result.rowCostPrice) {
    result.profitRate = calcProfitRate(result.rowCostPrice, result.rowUnitPriceBeforeTax);
    result.rowProfit = Big(result.rowUnitPriceBeforeTax).minus(result.rowCostPrice).round(0).toNumber();
  }

  /* 計算忘れ防止(開発者のため) */
  Object.entries(result).forEach(([key, val]) => {
    if (val === undefined) {
      throw new Error(`${key} が計算出来ませんでした。管理者をご連絡ください。`);
    }
  });

  return {
    ...params,
    rowCostPrice: result.rowCostPrice ?? 0,
    rowUnitPriceAfterTax: result.rowUnitPriceAfterTax ?? 0,
    rowUnitPriceBeforeTax: result.rowUnitPriceBeforeTax ?? 0,
    rowTaxAmount: result.rowTaxAmount ?? 0,
    profitRate: result.profitRate ?? 0,
    rowProfit: result.rowProfit ?? 0,
    unitPrice: result.unitPrice ?? 0,
  };

};