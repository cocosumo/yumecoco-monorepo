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

  return Math.round(+(costPrice) * (1 + (+(elemProfRate) / 100)));
};