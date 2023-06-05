
import { Big } from 'big.js';
import { convertToHalfWidth } from 'libs';

export const calcAfterTax = (
  value: number,
  taxRate = 0.1,
) => {
  try {
    const normalizedValue = convertToHalfWidth(value);

    const bTaxRate = Big(taxRate).add(1); // 1.1
    let result = Big(normalizedValue);

    result = result.mul(bTaxRate);
  
    return result.toNumber();

  } catch (e) {
    console.error(e);
    return 0;
  }

};
