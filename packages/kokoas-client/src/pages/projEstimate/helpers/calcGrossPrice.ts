import { TaxType } from 'types';

/**
 * 単価 * 利益 ＝金額(総価格)を求める処理
 * @param unitPrice 
 * @param quantity 
 * @param taxRate 
 * @param taxType 
 * @returns 
 */
export const calcGrossPrice = (
  unitPrice: number,
  quantity: number,
  taxRate: number,
  taxType: TaxType,
) => {

  // 金額の算出処理 : IF ( 税="課税", (単価*数量) * (1 + (税率/100)), (単価*数量))
  return Math.round(
    (unitPrice * +quantity) * (1 + ((taxType === '課税') ? (+taxRate / 100) : 0)),
  );

};