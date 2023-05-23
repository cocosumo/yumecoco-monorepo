
/**
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
 */

import { Big } from 'big.js';
import { calcBeforeTax } from './calcBeforeTax';
import { calcAfterTax, calcProfitRate } from 'libs';

// A = C - CD
const calcCostPrice = (amtBeforeTax: number, profitRate: number) => {
  return Big(amtBeforeTax)
    .minus(Big(amtBeforeTax).times(profitRate))
    .toNumber();
};

export const calculateAmount = ({
  taxRate = 0.1,
  costPrice,
  amountAfterTax,
  amountBeforeTax,
  profit,
  profitRate,
}:{
  /** 税率 */
  taxRate?: number,

  /** 原価 A */
  costPrice?: number,

  /** 金額（税抜） */
  amountBeforeTax?: number,

  /** 金額（税込） */
  amountAfterTax?: number,

  /** 粗利率 */
  profitRate?: number,

  /** 粗利額 */
  profit?: number,

}) => {
  try {

    // 契約金額（税込）か粗利率が編集されたとき
    if (amountAfterTax && profitRate) {
      const newAmtBeforeTax = calcBeforeTax(amountAfterTax, taxRate);
      const newCostPrice = calcCostPrice(newAmtBeforeTax, profitRate);

      const newProfit = Big(newAmtBeforeTax).minus(newCostPrice)
        .toNumber();
    
      return {
        amountAfterTax,
        profitRate,
        costPrice: newCostPrice,
        amountBeforeTax: newAmtBeforeTax,
        profit: newProfit,
      };
    }
    


    // 契約金額（税抜）が編集されたとき
    if (amountBeforeTax) {
      const newAmtAfterTax = calcAfterTax(amountBeforeTax, taxRate);
      const newCostPrice = calcCostPrice(amountBeforeTax, profitRate || 0);
      const newProfit = Big(amountBeforeTax).minus(newCostPrice)
        .toNumber();

      return {
        amountBeforeTax,
        profitRate,
        costPrice: newCostPrice,
        amountAfterTax: newAmtAfterTax,
        profit: newProfit,
      };
    }


    // 粗利額が編集されたとき
    if (amountAfterTax && profit) {
      const newAmtBeforeTax = calcBeforeTax(amountAfterTax, taxRate);
      const newCostPrice = Big(newAmtBeforeTax).minus(profit)
        .toNumber();
      const newProfitRate = calcProfitRate(newCostPrice, newAmtBeforeTax);

      return {
        amountAfterTax,
        profit,
        costPrice: newCostPrice,
        amountBeforeTax: newAmtBeforeTax,
        profitRate: newProfitRate,
      };
    }
        




    // TODO：その他のケース


    return {
      costPrice,
      amountAfterTax,
      amountBeforeTax,
      profit,
      profitRate,
    };


  } catch (err) {
    console.error(err);
    return {
      costPrice,
      amountAfterTax,
      amountBeforeTax,
      profit,
      profitRate,
    };
  } 

  
};