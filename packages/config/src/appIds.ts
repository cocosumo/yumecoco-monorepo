import { isProd } from './isProd';

/* 本番環境 */
export const prodAppIds = {
  customers: 207,
  custGroups: 208,
  projects: 209,
  projEstimates: 210,
  custMemos: 211,
  invoices: 226,
  contracts: 232,
  unissuedInvoiceAlert: 304,
  orderBudget: 321,
  order: 320,
  invoiceB2B: 323,
  invoiceB2C: 328,
} as const;

/* 開発環境 */
export const devAppIds = {
  /** 顧客 */
  customers: 173,

  /** 顧客グループ */
  custGroups: 185,

  /** 工事 */
  projects: 194,

  /** 見積 */
  projEstimates: 202,

  /** 顧客メモ */
  custMemos: 181,

  /** 請求書 */
  invoices: 204,

  /** 契約 */
  contracts: 231,

  /** 請求書未発行リマインダー */
  unissuedInvoiceAlert: 303,

  /** 工事ごと発注一覧 */
  orderBudget: 318,

  /** 発注  */
  order: 319,

  /** 請求B2B */
  invoiceB2B: 322,

  /** 顧客請求入金 */
  invoiceB2C: 326,

} as const;


/* デフォールトは開発環境のアプリ番号 */
export const AppIds = {

  /* 認証 */
  authDB: 221,

  /* システム改修履歴 */
  systemUpdate: 220,

  /* 会社情報 */
  companyDetails: 205,

  /** 社員名簿 */
  employees: 34,

  /** 部材 */
  materialsItem: 69,

  /** 大項目 */
  materialsMajor: 67,

  /** 中項目 */
  materialsMid: 68,

  /** 工事種別 */
  projTypes: 190,

  /** 自社工事区分 */
  inHouseProjTypes: 296,

  /** 店舗 */
  stores: 19,

  /** 郵便番号 */
  postalCode: 219,

  /** 単位 */
  units: 228,

  /**　システムの依頼  */
  ticketSystem: 236,

  /** Andpad入金データ */
  andpadPayments: 233,

  /** Andpad発注データ */
  andpadProcurements: 253,

  /** 取引先 */
  suppliers: 308,

  /** 社外メンバー */
  externalMembers: 309,

  ...(isProd ? prodAppIds : devAppIds),
} as const;

export type VAppIds = typeof AppIds[keyof typeof AppIds];