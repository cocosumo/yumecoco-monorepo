import { roundTo } from 'libs';


/** 利益率 = ( 単価 - 原価) / 単価 */
export const calcProfitRate = (
  /** 原価 */
  costPrice: number, 

  /** 単価 */
  unitPrice: number,
) => roundTo(( unitPrice - costPrice) / unitPrice, 4);