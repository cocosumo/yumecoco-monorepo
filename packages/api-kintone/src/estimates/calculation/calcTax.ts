
import { Big } from 'big.js';

const calcTax = (
  value: number,
  taxRate: number,
  isTaxable: boolean,
  mode: 'after' | 'before',
) => {
  if (!isTaxable) return value;

  const bTaxRate = Big(taxRate ?? 0.1).add(1); // 1.1
  let result = Big(value);

  if (mode === 'after') {
    result = result.mul(bTaxRate).round();
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
  isTaxable : boolean,
) => {

  return calcTax(beforeTaxValue, taxRate, isTaxable, 'after');
};


export const calcBeforeTax = (
  afterTaxValue: number,
  /** 1 + taxRate */
  taxRate: number,
  isTaxable : boolean,
) => {

  return calcTax(afterTaxValue, taxRate, isTaxable, 'before');

};