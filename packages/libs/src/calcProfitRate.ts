
import  { Big } from 'big.js';

/** 利益率 = ( 単価 - 原価) / 単価 */
export const calcProfitRate = (
  /** 原価 */
  costPrice: number,

  /** 単価 */
  unitPrice: number,
) => {

  if (!costPrice && !unitPrice ) return 0;

  // Edge case: if unitPrice is zero, division by zero will return NaN so handle it
  // by returning profitRate that can make unitPrice as close to zero when rounded.

  if (+unitPrice === 0) return -1000000;

  return Big(unitPrice).minus(costPrice)
    .div(unitPrice)
    .round(4)
    .toNumber();

};