/**
 * 単価(原価 * 利益率)を求める処理
 * @param costPrice 
 * @param elemProfRate 
 * @returns 
 */
export const calcUnitPrice = (
  costPrice: number,
  elemProfRate: number,
) => {

  let newUnitPrice = 0; // 入力値がエラー(数値でない)時は0にする
  if (!(isNaN(costPrice) || isNaN(elemProfRate))) {
    newUnitPrice = Math.round(+(costPrice) * (1 + (+(elemProfRate) / 100)));
  }
  return +newUnitPrice;
};