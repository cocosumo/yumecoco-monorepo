

/****
 * 計算の仕様
 * https://trello.com/c/9WvDqhV1
 *
 *  A = 原価
 *  B = 粗利（円）
 *  C = 単価
 *  D = 利益
 *
 * ---------------
 *
 *  C = A / (1 - D )
 *  B = C - A
 *  
 * ---------------
 * 逆算
 * 
 *  D = (-A + C) / C
 *  A = -CD + C  //Aは逆算の仕様はないので、JS可不要
 * 
 *  C = B + A
 *
 * ※ 行ごと丸める。
 * ※ Bはデータベースに保存もしないし、編集可でもない、ただ、表示するだけなので、ここで計算しない。表示する際に計算
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

  /** 行の税込み単価合計 */
  rowUnitPriceWithTax?: number,

  /** 税率 0% | 10% */
  taxRate: number,

  /** 課税かどうか */
  isTaxable: boolean,

}

export interface CalculationEstimateResults extends Required<CalculationEstimateParams> {

  /** 行の原価合計 */
  rowCostPrice : number,

  /** 行の税抜き単価合計 */
  rowUnitPriceWithoutTax: number,

  /* 粗利 */
  rowProfit: number,

}


/**
 * 
 * 基本的に逆算してほしい項目をundefinedにする。
 * 
 * 
 */
export const calculateEstimateRow = ( params : CalculationEstimateParams) : CalculationEstimateResults => {

  const {
    costPrice,
    isTaxable,
    taxRate,
    profitRate = 0,
    unitPrice,
    quantity,
    rowUnitPriceWithTax,
  } = params;



  // 数量がない場合、 
  if (quantity === 0) {
    return {
      ...params,
      profitRate: profitRate,
      rowProfit: 0,
      unitPrice: 0,
      rowCostPrice: 0,
      rowUnitPriceWithoutTax: 0,
      rowUnitPriceWithTax: 0,
    };
  }

  // 行の原価合計 = A * 数量
  const rowCostPrice = costPrice * quantity;

  
  // 「税込み単価合計」を編集されたら、「C 単価」と「税抜き単価合計」と「D 利益率」を逆算
  if (rowUnitPriceWithTax && !unitPrice && !profitRate) {

    // 税抜き単価合計
    const newRowUnitPriceWithoutTax = isTaxable ? (rowUnitPriceWithTax * (1 / (1 + taxRate)))  : rowUnitPriceWithTax;
   
    // C 単価
    const newUnitPrice = newRowUnitPriceWithoutTax / quantity;

    /** D = (-A + C) / C */
    const newProfitRate = (-costPrice + newUnitPrice) / newUnitPrice;

    /** B  行の粗利合計  =  C 行の税抜き単価合計 - A 行の原価合計  */
    const newRowProfit = newRowUnitPriceWithoutTax - rowCostPrice;

    return {
      ...params,
      rowCostPrice,
      rowProfit: newRowProfit,
      rowUnitPriceWithTax,
      rowUnitPriceWithoutTax: Math.round(newRowUnitPriceWithoutTax),
      unitPrice: Math.round(newUnitPrice),
      profitRate: newProfitRate, 
      
    };
  }

  // 「C 単価」を編集されたら、「税込み単価合計」と 「「税抜き単価合計」と「D 利益率」を逆算
  if (unitPrice && !rowUnitPriceWithTax && !profitRate) {

    // 税抜き単価合計
    const newRowUnitPriceWithoutTax = unitPrice * quantity;

    // 税込み単価合計
    const newRowUnitPriceWithTax = isTaxable ? (newRowUnitPriceWithoutTax * (1 + taxRate)) : newRowUnitPriceWithoutTax;

    // D 利益率
    const newProfitRate = (-costPrice + unitPrice) / unitPrice;

    /** B  行の粗利合計  =  C 行の税抜き単価合計 - A 行の原価合計  */
    const newRowProfit = newRowUnitPriceWithoutTax - rowCostPrice;

    return {
      ...params,
      rowProfit: newRowProfit,
      rowCostPrice,
      unitPrice,
      rowUnitPriceWithoutTax: newRowUnitPriceWithoutTax,
      rowUnitPriceWithTax: newRowUnitPriceWithTax,
      profitRate: newProfitRate,
    };
  }


  /** 通常と含め、その他のケース */ 


  // C 単価  = A / (1 - D)
  const newUnitPrice = costPrice / (1 - profitRate);

  // 税抜き単価合計
  const newRowUnitPriceWithoutTax = newUnitPrice * quantity; 

  // 税込み単価合計
  const newRowUnitPriceWithTax = isTaxable ? (newRowUnitPriceWithoutTax * (1 + taxRate)) : newRowUnitPriceWithoutTax;

  /** B  行の粗利合計  =  C 行の税抜き単価合計 - A 行の原価合計  */
  const newRowProfit = newRowUnitPriceWithoutTax - rowCostPrice;

  return {
    ...params,
    rowProfit: newRowProfit,
    profitRate,
    rowCostPrice,
    unitPrice: newUnitPrice,
    rowUnitPriceWithoutTax: newRowUnitPriceWithoutTax,
    rowUnitPriceWithTax: newRowUnitPriceWithTax,
  };
    
  


  
};