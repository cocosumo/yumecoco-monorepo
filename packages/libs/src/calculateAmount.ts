
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
 *  A = C - CD  //Aは逆算の仕様はないので、JS化不要
 *
 *  C = B + A
 * 
 */

import { Big } from 'big.js';
import { calcBeforeTax } from './calcBeforeTax';
import { calcAfterTax, calcProfitRate } from 'libs';


interface Values {

  /** 金額（税抜） */
  amountAfterTax?: number,

  /** 金額（税込） 又は単価 */
  amountBeforeTax?: number,

  /** 粗利率 */
  profit?: number,

  /** 原価 */
  costPrice?: number,

  /** 粗利率 Decimal form e.g. 0.1 */
  profitRate?: number,

  /** 税率  Decimal form e.g. 0.1 */
  taxRate?: number
}

/** A = C - CD **/
const calcCostPrice = (amtBeforeTax: number, profitRate: number) => {
  return Big(amtBeforeTax)
    .minus(Big(amtBeforeTax).times(profitRate))
    .toNumber();
};

export const calculateAmount = (p : Values): Required<Values> => {
  // don't mutate the original p params, mutate res instead
  const res : Required<Values> =  {
    amountAfterTax: p.amountAfterTax || 0,
    amountBeforeTax: p.amountBeforeTax || 0,
    profit: p.profit || 0,
    costPrice: p.costPrice || 0,
    profitRate: p.profitRate || 0,
    taxRate: p.taxRate || 0.1, // default 10%
  };

  try {



    if (p.amountAfterTax) {
      res.amountBeforeTax = calcBeforeTax(res.amountAfterTax, p.taxRate);
    }

    if (p.amountBeforeTax) {
      res.amountAfterTax = calcAfterTax(res.amountBeforeTax, p.taxRate);
    }

    // 契約金額（税込）と粗利率が編集されたとき
    if (p.amountAfterTax && p.profitRate) {

      res.costPrice = calcCostPrice(res.amountBeforeTax, p.profitRate);

      res.profit = Big(res.amountBeforeTax).minus(res.costPrice)
        .toNumber();

    
      return res;
    }
    

    // 契約金額（税抜）が編集されたとき
    if (p.amountBeforeTax && p.profitRate) {

      res.costPrice = calcCostPrice(res.amountBeforeTax, p.profitRate);
      res.profit = Big(p.amountBeforeTax).minus(res.costPrice)
        .toNumber();

      return res;
    }


    // 粗利額が編集されたとき
    if (p.amountAfterTax && p.profit) {
      res.costPrice = Big(res.amountBeforeTax).minus(p.profit)
        .toNumber();
      res.profitRate = calcProfitRate(res.costPrice, res.amountBeforeTax);

      return res;
    }
        
    // 原価が編集されたとき
    if (p.amountAfterTax && p.costPrice) {
      res.profit = Big(res.amountBeforeTax).minus(p.costPrice)
        .toNumber();
      res.profitRate = calcProfitRate(p.costPrice, res.amountBeforeTax);

      return res;
    }


    return res;

  } catch (err) {
    console.error(err);
    return res;
  } 

  
};