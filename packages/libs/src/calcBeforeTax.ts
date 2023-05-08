
import { Big } from 'big.js';
import { convertToHalfWidth } from 'libs';

export const calcBeforeTax = (
  value: number,
  taxRate: number,
) => {
  const normalizedValue = convertToHalfWidth(value);

  const bTaxRate = Big(taxRate ?? 0.1).add(1); // 1.1
  let result = Big(normalizedValue);

  result = result.div(bTaxRate).round();
  
  return result.toNumber();
};
