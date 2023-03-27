
import { Big } from 'big.js';
import { convertToHalfWidth } from 'libs';

const calcTax = (
  value: number,
  taxRate: number,
  isTaxable: boolean,
  mode: 'after' | 'before',
) => {
  const normalizedValue = convertToHalfWidth(value);

  if (!isTaxable) return normalizedValue;

  const bTaxRate = Big(taxRate ?? 0.1).add(1); // 1.1
  let result = Big(normalizedValue);

  if (mode === 'after') {
    result = result.mul(bTaxRate);
  } else {
    result = result.div(bTaxRate).round();
  }

  return result.toNumber();
};

/**
 * 行の単価 * (1 + 税率)
 */
export const calcAfterTax = (
  beforeTaxValue: number,
  /** 1 + taxRate */
  taxRate: number,
  isTaxable = true,
) => {

  return calcTax(beforeTaxValue, taxRate, isTaxable, 'after');
};


export const calcBeforeTax = (
  afterTaxValue: number,
  /** 1 + taxRate */
  taxRate: number,
  isTaxable: boolean,
) => {

  return calcTax(afterTaxValue, taxRate, isTaxable, 'before');

};
