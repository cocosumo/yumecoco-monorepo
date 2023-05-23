import { zodErrorMapJA } from 'kokoas-client/src/lib/zodErrorMapJA';
import { envelopeStatuses, signMethods } from 'types';
import { z } from 'zod';

z.setErrorMap(zodErrorMapJA());

export const subsidyMethods = ['工事に含む', '顧客に返金'] as const;
export type SubsidyMethod = typeof subsidyMethods[number];

export const payMethods = ['持参', '集金', '振込'] as const;

const schema = z.object({

  /** 顧客グループ番号 */
  custGroupId: z.string(),

  /** 工事のuuid */
  projId: z.string().uuid(),

  /** 工事名 */
  projName: z.string(),

  /** 契約のuuid */
  contractId: z.string().uuid()
    .optional(),

  /** 契約合計金額（税込）*/
  totalContractAmtAfterTax: z.number(),

  /** 契約合計金額（税抜）*/
  totalContractAmtBeforeTax: z.number(),

  /** 粗利額 */
  totalProfit: z.number(),

  /** 粗利率 */
  profitRate: z.number(),

  /** 税金 */
  taxRate: z.number(),

  /** 契約金 */
  hasContractAmt: z.boolean(),
  contractAmt: z.number(),
  contractAmtDate: z.date().nullable(),

  /** 着手金 */
  hasInitialAmt: z.boolean(),
  initialAmt: z.number(),
  initialAmtDate: z.date().nullable(),

  /** 中間金 */
  hasInterimAmt: z.boolean(),
  interimAmt: z.number(),
  interimAmtDate: z.date().nullable(),

  /** 最終金 */
  hasFinalAmt: z.boolean(),
  finalAmt: z.number(),
  finalAmtDate: z.date().nullable(),
  
  /** 返金有無 */
  hasRefund: z.boolean(),
  
  /** 返金額 */
  refundAmt: z.number(),

  /** 補助金有無 */
  hasSubsidy: z.boolean(),

  /** 補助金 */
  subsidyAmt: z.number(),
  
  /** 補助種類 */
  subsidyMethod: z.enum(subsidyMethods),
  
  /** 支払い方法 */
  payMethod: z.enum(payMethods),
  
  /** 振込先 */
  payDestination: z.string().optional(),

  /** 着手 */
  startDate: z.date().nullable(),
  /** 契約の日から着手までの日数*/
  startDaysAfterContractDate: z.number(),

  /** 完成 */
  finishDate: z.date().nullable(),
  /** 契約の日から完成までの日数*/
  finishDaysAfterContractDate: z.number(),
  
  /** 引渡し時期 */
  deliveryDate: z.date().nullable(),

  /** 契約日 */
  contractDate: z.date(),

  /** エンヴェロープ */
  envelopeStatus: z.enum(envelopeStatuses),
  
  /**　エンヴェロープID */
  envelopeId: z.string()
    .optional(),
  
  /** 署名手法 */
  signMethod: z.enum(signMethods),
  
  
})
  .refine(({ payMethod, payDestination }) => {
    if (payMethod === '振込' && !payDestination) {
      return false;
    }
    return true;
  }, {
    path: ['payDestination'],
    message: '振込先を入力してください。',
  })
  .refine(({ hasContractAmt, contractAmt }) => {
    if (hasContractAmt && !contractAmt) {
      return false;
    }
    return true;
  }, {
    path: ['contractAmt'],
    message: '契約金を入力してください。',
  })
  .refine(({ hasInitialAmt, initialAmt }) => {
    if (hasInitialAmt && !initialAmt) {
      return false;
    }
    return true;
  }, {
    path: ['initialAmt'],
    message: '着手金を入力してください。',
  })
  .refine(({ hasInterimAmt, interimAmt }) => {
    if (hasInterimAmt && !interimAmt) {
      return false;
    }
    return true;
  }, {
    path: ['interimAmt'],
    message: '中間金を入力してください。',
  })
  .refine(({ hasFinalAmt, finalAmt }) => {
    if (hasFinalAmt && !finalAmt) {
      return false;
    }
    return true;
  }, {
    path: ['finalAmt'],
    message: '最終金を入力してください。',
  })
  .refine(({ hasRefund, refundAmt }) => {
    if (hasRefund && !refundAmt) {
      return false;
    }
    return true;
  }, {
    path: ['refundAmt'],
    message: '返金額を入力してください。',
  })
  .refine(({ hasSubsidy, subsidyAmt }) => {
    if (hasSubsidy && !subsidyAmt) {
      return false;
    }
    return true;
  }, {
    path: ['subsidyAmt'],
    message: '補助金を入力してください。',
  })
  .refine(({
    totalContractAmtAfterTax,
    contractAmt,
    initialAmt,
    interimAmt,
    finalAmt,
  }) => {
    if (totalContractAmtAfterTax !== (contractAmt ?? 0) + (initialAmt ?? 0) + (interimAmt ?? 0) + (finalAmt ?? 0)) {
      return false;
    }
    return true;
  }, {
    path: ['totalContractAmtAfterTax'],
    message: '契約合計金額と契約金、着手金、中間金、最終金の合計が一致しません。',  
  });
  
  


export type TypeOfForm = z.infer<typeof schema>;


export default schema;