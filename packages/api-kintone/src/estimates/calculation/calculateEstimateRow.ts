

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
 * 
 * 逆算
 * 
 *  D = (C - A) / C
 *  A = C - CD  //Aは逆算の仕様はないので、JS可不要
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
    rowUnitPriceAfterTax,
  } = params;



  // 数量がない場合、 
  if (quantity === 0) {
    return {
      ...params,
      profitRate: profitRate,
      rowProfit: 0,
      unitPrice: 0,
      rowCostPrice: 0,
      rowUnitPriceBeforeTax: 0,
      rowUnitPriceAfterTax: 0,
    };
  }

  // 行の原価合計 = A * 数量
  const rowCostPrice = costPrice * quantity;

  
  // 「税込み単価合計」を編集されたら、「C 単価」と「税抜き単価合計」と「D 利益率」を逆算
  if (rowUnitPriceAfterTax && !unitPrice && !profitRate) {

    // 税抜き単価合計
    const newRowUnitPriceBeforeTax = isTaxable ? (rowUnitPriceAfterTax * (1 / (1 + taxRate)))  : rowUnitPriceAfterTax;
   
    // C 単価
    const newUnitPrice = newRowUnitPriceBeforeTax / quantity;

    /** D = (-A + C) / C */
    const newProfitRate = (-costPrice + newUnitPrice) / newUnitPrice;

    /** B  行の粗利合計  =  C 行の税抜き単価合計 - A 行の原価合計  */
    const newRowProfit = newRowUnitPriceBeforeTax - rowCostPrice;

    return {
      ...params,
      rowCostPrice,
      rowProfit: newRowProfit,
      rowUnitPriceAfterTax,
      rowUnitPriceBeforeTax: Math.round(newRowUnitPriceBeforeTax),
      unitPrice: Math.round(newUnitPrice),
      profitRate: newProfitRate, 
      
    };
  }

  // 「C 単価」を編集されたら、「税込み単価合計」と 「「税抜き単価合計」と「D 利益率」を逆算
  if (unitPrice && !rowUnitPriceAfterTax && !profitRate) {

    // 税抜き単価合計
    const newRowUnitPriceBeforeTax = unitPrice * quantity;

    // 税込み単価合計
    const newrowUnitPriceAfterTax = isTaxable ? (newRowUnitPriceBeforeTax * (1 + taxRate)) : newRowUnitPriceBeforeTax;

    // D 利益率
    const newProfitRate = (-costPrice + unitPrice) / unitPrice;

    /** B  行の粗利合計  =  C 行の税抜き単価合計 - A 行の原価合計  */
    const newRowProfit = newRowUnitPriceBeforeTax - rowCostPrice;

    return {
      ...params,
      rowProfit: newRowProfit,
      rowCostPrice,
      unitPrice,
      rowUnitPriceBeforeTax: newRowUnitPriceBeforeTax,
      rowUnitPriceAfterTax: newrowUnitPriceAfterTax,
      profitRate: newProfitRate,
    };
  }


  /** 通常と含め、その他のケース */ 


  // C 単価  = A / (1 - D)
  const newUnitPrice = costPrice / (1 - profitRate);

  // 税抜き単価合計
  const newRowUnitPriceBeforeTax = newUnitPrice * quantity; 

  // 税込み単価合計
  const newRowUnitPriceAfterTax = isTaxable ? (newRowUnitPriceBeforeTax * (1 + taxRate)) : newRowUnitPriceBeforeTax;

  /** B  行の粗利合計  =  C 行の税抜き単価合計 - A 行の原価合計  */
  const newRowProfit = newRowUnitPriceBeforeTax - rowCostPrice;

  return {
    ...params,
    rowProfit: newRowProfit,
    profitRate,
    rowCostPrice,
    unitPrice: newUnitPrice,
    rowUnitPriceBeforeTax: newRowUnitPriceBeforeTax,
    rowUnitPriceAfterTax: newRowUnitPriceAfterTax,
  };
    
  


  
};