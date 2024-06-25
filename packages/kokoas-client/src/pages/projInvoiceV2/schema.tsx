import { zodErrorMapJA } from 'kokoas-client/src/lib/zodErrorMapJA';
import { z } from 'zod';

z.setErrorMap(zodErrorMapJA());


export const payMethods = ['持参', '集金', '振込'] as const;

const invoiceDetail = z.object({
  /** 項目ID */
  invoiceDetailId: z.string(),

  /** 請求項目 */
  invoiceItem: z.string(),

  /** 請求金額 */
  billingAmount: z.number(),

}).refine(data => {
  // invoiceItemが空でない時、billingAmountも空ではいけない
  if (data.invoiceItem.trim() !== '') {
    return data.billingAmount !== null && data.billingAmount !== undefined;
  }
  return true;
}, {
  message: '請求金額が入力されていません',
  path: ['billingAmount'],
});

export const schema = z.object({

  /** 請求書のuuid */
  invoiceId: z.string().uuid()
    .optional(),

  /** 請求書のステータス */
  invoiceStatus: z.string(),

  /** 請求書伝票番号 */
  invoiceDataId: z.string().optional(),

  /** 工事のuuid */
  projId: z.string().uuid(),

  /** 契約のuuid */
  contractIds: z.array(z.string().uuid()),

  /** 契約のuuid */
  excludedPlanContracts: z.array(z.string().uuid()),

  /** 請求対象外の設計契約の有無 */
  hasExcludedPlanContractAmt: z.boolean(),

  /** 顧客グループ番号 */
  custGroupId: z.string(),

  /** 顧客名 */
  custName: z.string(),

  /** 工事名 */
  projName: z.string(),

  /** 工事番号 */
  projDataId: z.string(),

  /** 店舗名 */
  storeName: z.string(),

  /** 担当者 */
  personInCharge: z.string(),

  /** 契約合計金額（税込）*/
  totalContractAmtAfterTax: z.number(),

  /** 契約合計金額（税抜）*/
  totalContractAmtBeforeTax: z.number(),

  /** 請求済み金額(税込) */
  billedAmount: z.number(),

  /** 今回の請求金額 */
  billingAmount: z.number(),

  /** 請求合計金額(税込) */
  billingTotalAmount: z.number(),

  /** 請求書発行日 */
  invoiceIssueDate: z.date().nullable(),

  /** 入金予定日 */
  scheduledPayDate: z.date().optional()
    .nullable(),

  /** 入金区分(予定) */
  payMethodPlan: z.string().optional(),

  /** 請求内容 */
  invoiceDetails: z.array(invoiceDetail)
    .min(1, { message: '請求金額が入力されていません' }),

  /** 備考 */
  remarks: z.string(),

  /** 入金状態(ステータス) */
  paymentStatus: z.string(),

});

export type TForm = z.infer<typeof schema>;
export type KForm = keyof TForm;
export type TInvoiceDetails = TForm['invoiceDetails'];
export type TInvoiceDetail = TInvoiceDetails[number];
export type KTInvoiceDetail = keyof TInvoiceDetail;
