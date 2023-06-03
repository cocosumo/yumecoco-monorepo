import { Big } from 'big.js';

/**
 * なぜ：
 * 
 * 例： 2.555 --> 2.56 // ほしい値
 * 
 * 22.555.toFixed(2) // 22.55 ×
 * 22.555.toPrecision(2) // 23 ×
 * Math.round(22.555) // 23 ×
 * 
 * @see https://mikemcl.github.io/big.js/#round
 *  
 */
export const roundTo = (value: number, precision = 0) => new Big(value)
  .round(precision)
  .toNumber();