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

  /** 工事期間 開始日 */
  constStartDate: string,

  /** 工事期間 開始日 */
  constFinishDate: string,

  /** 工事担当者 */
  cocoConst: string,


  /** 会社名 */
  companyName: string,

  /** 担当店舗 */
  store: string,

  /** 店舗住所 */
  storeAddress: string,

  /** 店舗TEL */
  storeTel: string,

  /** 店舗FAX */
  storeFax: string,

  /** 建築業許可番号 */
  buildingLicenseNumber: string,


  /** 業者住所1 */
  vendorAddress1: string,

  /** 業者住所2 */
  vendorAddress2: string,

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
