/** 発注に関わるデータ型定義 */

export interface OrderData {

  /** 発注ids */
  orderId: string,

  /** 発注番号 */
  purchaseOrderId: string,

  /** 発注日 */
  orderDate: string,

  /** 工事id */
  projId: string,

  /** 工事No. */
  projNum: string,

  /** 工事No.(日本語) */
  projNumJa: string,

  /** 工事名 */
  projName: string,

  /** 顧客名 */
  custGroupName: string,

  /** 工事場所住所 */
  constAddress: string,

  /** 工事期間 */
  constPeriod: string,

  /** 工事担当者 */
  cocoConst: string,

  /** 担当店舗 */
  store: string,

  /** 業者住所 */
  vendorAddress: string,

  /** 業者担当者 */
  vendorManeger: string,
}


/*************************
 * REQUESTS HANDLER TYPES
 */

export type GetCostMgtExcelByDataResult = {
  fileName: string;
  fileB64: string;
} | Error;
