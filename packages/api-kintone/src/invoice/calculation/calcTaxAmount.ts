import { Big } from 'big.js';


/** 消費税額の算出処理　：　税込金額から逆算する
 * 請求入力の算出処理の優先順位の要件により、税込金額からまずは税額を算出する
 * 税抜金額は、税込金額 - 税額　にて算出
 */
export const calcTaxAmount = (
  afterTaxValue: number,
  /** 1 + taxRate */
  taxRate: number,
) => {

  const bTaxRate = Big(taxRate ?? 0.1).add(1); // 1.1
  return Big(afterTaxValue).div(bTaxRate).mul(taxRate).round(0).toNumber();
};
