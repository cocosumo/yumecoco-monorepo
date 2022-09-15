import { taxChoices } from '../form';

export const calcTotalUnitPrice = (
  unitPrice: number,
  quantity: number,
  taxRate: number,
  tax: typeof taxChoices[number],
) => {

  // 金額の算出処理 : IF ( 税="課税", (単価*数量) * (1 + (税率/100)), (単価*数量))
  let newPrice = 0; // 入力値がエラー(数値でない)時は0にする
  if ((unitPrice !== 0) && !(isNaN(quantity))) {
    if (tax === '課税') {
      newPrice = Math.round((unitPrice * +quantity) * (1 + (+taxRate / 100)));
    } else { /* 非課税 */
      newPrice = Math.round(unitPrice * +quantity);
    }
  }

  return +newPrice;
};