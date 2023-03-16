import { EnvelopeUpdateSummary } from 'docusign-esign';
import { TEnvelopeStatus } from './docusign';

export type TProjReq = {
  projId?: string,
  custGroupId?: string,
  envelopeId?: string,
  origin?: string
};

/****************
 * RequestHandlers
 */

export interface ParsedDaikokuEst {
  /** 書類タイトル */
  documentTitle: string,
  /** 顧客名 */
  custName: string,
  /** 工事名 */
  projName: string,
  /** 工事住所 */
  projAddress: string,
  /** 工事番号 */
  projDataId: string,
  /** 見積管理番号 */
  estDataId: string,
  /** 税率 */
  taxRate: number,
  /** 税額 */
  taxAmount: number,
  /* 割引 */
  discountAmount: number,
  /** 経費込合計 (割引なし額) */
  amountBeforeDiscount: number,
  /** 工事費 (割引あり額) */
  amountBeforeTax: number,
  /** 御見積合計 */
  amountAfterTax: number,
  /** 内訳明細 */
  majorItems: Array<{
    name: string,
    unit: string,
    quantity: number,
    amount: number,
  }>
  items: Array<{
    majorItem: string,
    middleItem: string,
    material: string,
    unit: string,
    quantity: number,
    unitPrice: number,
    amount: number,
    rowDetails: string,
  }>
}

export interface ParsedDaikokuGenka {
  documentTitle: string,
  projDataId: string,
  projName: string,
  estDataId: string,
  printDate: string,
  createdDate: string,
  taxRate: number,
  totalAmountAfterTax: number,
  totalBeforeAfterTax: number,
  totalTaxAmount: number,
  totalCostPrice: number,
  totalProfit: number,
  overallProfitRate: number,
  items: Array<{
    majorItem: string,
    middleItem: string,
    material: string,
    unit: string,
    costPrice: number,
    profitRate: number,
    quantity: number,
    unitPrice: number,
    rowUnitPrice: number,
    rowCostPrice: number,
    rowDetails: string,
  }>
}


export interface ParsedInvoiceReport {
  billingAmount: number,
  slipNumber: string,
  plannedPaymentDate: string,
  issuedDateTime: string,
  custGroupId: string,
  estimateLists: Array<{
    projId: string,
    dataId: string,
    projTypeName: string,
    estimateId: string,
    amountPerContract: number,
    paymentType: string,
  }>;
}

export interface ParsedCustGroupReport {
  custGroupId: string,
  members: Array<{
    customerName: string,
  }>;
}

export interface ParsedCompanyDetailsDatReport {
  companyName: string,
  companyPostCode: string,
  companyAddress: string,
  kenchikugyoKyoka: string,
  takkengyoNumber: string,
  officeRegistration: string,
  invoiceSystemNumber: string,
}


export interface ReqSendContract {
  userCode: string,
  projEstimateId: string,
  signMethod?: 'electronic' | 'wetInk',
}


export interface ISendEnvelopeResponse {
  /** base64 files */
  documents: string[],
  envelopeStatus: TEnvelopeStatus,
  envelopeId: string,
}


export interface IVoidRes {
  voidSuccess: boolean,
  envelopeStatus: TEnvelopeStatus,
  envelopSummary: EnvelopeUpdateSummary,
  documents?: string[],
  error?: string,
}

export interface IVoidReq {
  envelopeId: string,
  voidedReason: string
}

export interface ReqDownloadParams {
  userCode: string,
  projEstimateId: string,
  fileType: 'pdf' | 'xlsx',
}

export type ReqPreviewParams = {
  projId: string,
  projEstimateId: string
  userCode: string,
};

export interface IRequestJWTUserTokenResponse {
  body: {
    access_token: string,
    expires_in: string
  }
}

export interface DownloadInvoiceResponse {
  pdfDat: string,
  generatedTime: Date,
}

export type ApiNodes =
  | 'docusign'
  | 'kokoas';
