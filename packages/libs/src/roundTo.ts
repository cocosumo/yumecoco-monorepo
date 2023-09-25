import { Big, RoundingMode } from 'big.js';

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
 * rounding mode Property(rmProperty)
 * Big.roundDown     : 0 : 切り捨て
 * Big.roundHalfUp   : 1 : 四捨五入
 * Big.roundHalfEven : 2 : 五捨五超入
 * Big.roundUp       : 3 : 切り上げ
 * Big.roundHalfDown : 4 : 五捨六入
 * 
 */
export const roundTo = (value: number | string, precision = 0, rmProperty = 1) => {
  try {
    if (value === '') return 0;
    
    if (rmProperty === 4) {
      const base = Big(precision).plus(1)
        .toNumber();
      const exponent = Big(10).pow(base);
      const adjustedValue = Big(1).div(exponent);
      const newValue = Big(value).minus(adjustedValue);
      
      return Big(newValue).round(precision, 1)
        .toNumber();
  
    } else {
      return new Big(value)
        .round(precision, rmProperty as RoundingMode)
        .toNumber();
    }

  } catch (error) {
    console.error(error);
    return 0;
  }


};