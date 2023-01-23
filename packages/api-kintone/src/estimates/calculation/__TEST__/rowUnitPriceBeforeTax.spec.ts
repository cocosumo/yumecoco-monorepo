/**
 * rowUnitPriceBeforeTax
 *
 * Given: 原価、数量、税抜き金額
 * 結果：税込み合計、 単価、粗利、利益率、税
 *
 * ユースケース：大黒さんからの原価明細には行ごとに税抜き金額が乗っています。
 *
 */

import { calculateEstimateRow } from '../calculateEstimateRow';

const cases: Array<{
  costPrice: number,
  quantity: number,
  rowUnitPriceBeforeTax: number
}> = [

  // 通常 1

  {
    costPrice: 1000,
    quantity: 1,
    rowUnitPriceBeforeTax: 2000,
  },


  // 数量に小数点　１桁

  {
    costPrice: 1000,
    quantity: 1.5,
    rowUnitPriceBeforeTax: 3000,
  },


  // 小数点は2桁
  {
    costPrice: 500,
    quantity: 63.91,
    rowUnitPriceBeforeTax: 44354,
  },

  // 小数点は2桁
  {
    costPrice: 1500,
    quantity: 105.99,
    rowUnitPriceBeforeTax: 243777,
  },

];

describe('rowUnitPriceBeforeTax', () => {

  test.each(cases)(
    'given %p arguments, returns %p',
    (input: typeof cases[number]) => {
      const result = calculateEstimateRow({
        ...input,
        isTaxable: true, // always true, adjust cases type as needed
        taxRate: 0.1, // fixed. adjust as needed.
      });

      const result2 = calculateEstimateRow({ ...result, rowUnitPriceBeforeTax: undefined });

      console.log(result, result2);

      expect(result).toStrictEqual(result2);

    },
  );
});