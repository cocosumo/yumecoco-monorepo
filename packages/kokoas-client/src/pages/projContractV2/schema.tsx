import { zodErrorMapJA } from 'kokoas-client/src/lib/zodErrorMapJA';
import { envelopeStatuses, signMethods } from 'types';
import { z } from 'zod';

z.setErrorMap(zodErrorMapJA());

//export const subsidyMethods = ['工事に含む', '顧客に返金'] as const;
export const refundMethod = ['山豊工建', '顧客'] as const;
export type RefundMethod = typeof refundMethod[number];


//export type SubsidyMethod = typeof subsidyMethods[number];

export const payMethods = ['持参', '集金', '振込'] as const;

export const contractTypes = [ 
  '契約', 
  '銀行用', 
  '工事実行', 
  '追加', 
  '設計契約',
] as const;

const schema = z.object({

  /** 区分 */
  contractType: z.string(),

  /** 追加区分 */
  contractAddType: z.string().optional(),

  /** 見積番号 */
  projEstimateId: z.string(),

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
  totalProfit: z.number()
    .refine(
      (val) => val !== 0, 
      {
        message: '粗利額が0円です。',
      },
    ),

  /** 粗利率 */
  profitRate: z.number(),

  /** 税金 */
  taxRate: z.number(),

  /** 原価 */
  costPrice: z.number(),

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

  /** その他の金額 */
  hasOthersAmt: z.boolean(),
  othersAmt: z.number(),
  othersAmtDate: z.date().nullable(),
  
  /** 返金有無 */
  hasRefund: z.boolean(),
  
  /** 返金額 */
  refundAmt: z.number()
    .min(0, {
      message: 'マイナス"-"入力しないでください',
    }),

  /** 返金方法 */
  refundMethod: z.enum(refundMethod),

  /** 減額有無 */
  hasReduction: z.boolean(),

  /** 減額 */
  reductionAmt: z.number()
    .min(0, {
      message: 'マイナス"-"入力しないでください',
    }),

  /** 補助金有無 */
  hasSubsidy: z.boolean(),

  /** 補助金 */
  subsidyAmt: z.number(),
  
  /** 補助種類 Removed at K137 */
  // subsidyMethod: z.enum(subsidyMethods),
  
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
  .refine(({ hasOthersAmt, othersAmt }) => {
    if (hasOthersAmt && !othersAmt) {
      return false;
    }
    return true;
  }, {
    path: ['othersAmt'],
    message: 'その他の金額を入力してください。',
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
  .refine(({ hasReduction, reductionAmt }) => {
    if (hasReduction && !reductionAmt) {
      return false;
    }
    return true;
  }, {
    path: ['reductionAmt'],
    message: '減額を入力してください。',
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
    othersAmt,
  }) => {
    const totalPaymentAmts = [
      contractAmt,
      initialAmt,
      interimAmt,
      finalAmt,
      othersAmt,
    ].reduce((acc, cur) => acc + (cur ?? 0), 0);

    if (totalContractAmtAfterTax !== totalPaymentAmts) {
      return false;
    }
    return true;
  }, {
    path: ['totalContractAmtAfterTax'],
    message: '契約合計金額と「契約金、着手金、中間金、最終金、その他」の合計が一致しません。',  
  });
  
  


export type TypeOfForm = z.infer<typeof schema>;


export default schema;