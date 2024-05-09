/* 発注関連 */
export const orderProgress = [
  '未発注',
  '発注済',
] as const;

export const invoiceProgress = [
  '請求済',
  '請求確認済',
  '請求承認済',
  '支払済',
] as const;

export const orderMethodChoices = ['印刷', 'メール'] as const;
export type TOrderMethod = typeof orderMethodChoices[number];


export type KOrderProgress = typeof orderProgress[number];
export type KInvoiceProgress = typeof invoiceProgress[number];

export type KProgress = KOrderProgress | KInvoiceProgress;


/** 発注に関わるデータ型定義 */

export interface OrderDetails {
  /** 大項目 */
  majorItem: string,

  /** 中項目 */
  middleItem: string,

  /** 部材 */
  material: string,

  /** 単位 */
  unit: string,

  /** 数量 */
  quantity: number,

  /** 単価 */
  costPrice: number,

  /** 発注金額(税抜) */
  orderAmountBeforeTax: number,

  /** 税率 */
  taxRate: number,

  /** 備考 */
  rowRemarks: string,

}

export interface OrderData {

  /** 発注ids */
  orderId: string,

  /** 発注番号 */
  purchaseOrderId: string,

  /** 発注日 */
  orderDate: string,

  /**発注方法 */
  orderMethod: TOrderMethod,


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

  /** 工事期間 終了日 */
  constFinishDate: string,

  /** 工事担当者 */
  cocoConst: string,

  /** 営業担当者 */
  cocoAG: string,

  /** 会社名 */
  companyName: string,

  /** 担当店舗 */
  agStore: string,

  /** 店舗エリア　東・西 */
  storeArea: string,

  /** 店舗 （東：豊川中央店、西：豊田中央店） */
  storeName: string, // 豊川中央店

  /** 店舗郵便番号 */
  postCode: string,

  /** 店舗住所 */
  storeAddress: string,

  /** 店舗TEL */
  storeTel: string,

  /** 店舗FAX */
  storeFax: string,

  /** 建築業許可番号 */
  buildingLicenseNumber: string,

  /** 業者名 */
  supplierName: string,

  /** 業者住所1 */
  supplierAddress1: string,

  /** 業者住所2 */
  supplierAddress2: string,

  /** 業者担当者1 */
  supplierOfficer1: string,

  /** 業者担当者2 */
  supplierOfficer2: string,

  /** 業者Email */
  supplierOfficerEmail?: string,
  
  /** 宛先CC */
  emailBcc?: string,

  /** 宛先BCC */
  emailCc?: string,


  /** 適格請求書発行事業者番号 */
  invoiceSystemNumber: string,

  /** 発注詳細 */
  orderDetails: OrderDetails[],
}


/*************************
 * REQUESTS HANDLER TYPES
 */

export type GetDownloadOrderSlipResult = {
  fileName: string;
  fileB64: string;
  data: OrderData;
};

export type GetDownloadOrderSlipBody = {
  orderId: string;
};
