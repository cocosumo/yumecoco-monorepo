import { KInvoiceProgress } from 'types/src/common/order';

export interface SearchResult {
  /** uuid */
  invoiceId: string;

  invoiceStatus: KInvoiceProgress;
  projName: string;
  storeName: string;
  cocoAgName: string;

  /**　業者名 */
  supplierName: string;

  /** 適格請求書発行事業者番号 */
  invoiceSystemNumber: string;

  /** 発注金額 （税抜） */
  orderAmount: number;

  /** 支払金額 (請求金額) */
  paymentAmount: number;

  /** 請求日 */
  invoiceDate: string;

  /** 作成日 */
  createdAt: string;

  /** 更新日 */
  updatedAt: string;
}

export type KeyOfSearchResult = keyof SearchResult;