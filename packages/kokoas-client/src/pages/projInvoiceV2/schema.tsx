import { zodErrorMapJA } from 'kokoas-client/src/lib/zodErrorMapJA';
import { z } from 'zod';

z.setErrorMap(zodErrorMapJA());

const invoiceDetail = z.object({
  /** 請求項目 */
  invoiceItem: z.string(),

  /** 請求金額 */
  billingAmount: z.number(),

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

  /** 顧客グループ番号 */
  custGroupId: z.string(),

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
  invoiceDetails: z.array(invoiceDetail),

  /** 備考 */
  remarks: z.string(),

});

export type TForm = z.infer<typeof schema>;
export type KForm = keyof TForm;
export type TInvoiceDetails = TForm['invoiceDetails'];
export type TInvoiceDetail = TInvoiceDetails[number];
export type KTInvoiceDetail = keyof TInvoiceDetail;