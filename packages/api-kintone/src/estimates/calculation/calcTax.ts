
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


/** 消費税額の算出処理　：　税込金額から逆算する */
export const calcTaxAmount = (
  afterTaxValue: number,
  /** 1 + taxRate */
  taxRate: number,
) => {

  const bTaxRate = Big(taxRate ?? 0.1).add(1); // 1.1
  return Big(afterTaxValue).div(bTaxRate).mul(taxRate);
};