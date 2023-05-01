import { zodErrorMapJA } from 'kokoas-client/src/lib/zodErrorMapJA';
import { z } from 'zod';

z.setErrorMap(zodErrorMapJA());

export const subsidyTypes = ['工事に含む', '顧客に返金'] as const;
export type SubsidyTypes = typeof subsidyTypes[number];

export const payMethods = ['持参', '集金', '振込'] as const;

const schema = z.object({

  /** 工事のuuid */
  projId: z.string().uuid(),

  /** 工事名 */
  projName: z.string(),

  /** 契約のuuid */
  contractId: z.string().uuid()
    .optional(),

  /** 契約合計金額 */
  totalContractAmt: z.number(),

  /** 売上原価 */
  projectCost: z.number().nullable(),

  /** 契約金 */
  hasContractAmt: z.boolean(),
  contractAmt: z.number().nullable(),
  contractAmtDate: z.date().nullable(),

  /** 着手金 */
  hasStartAmt: z.boolean(),
  startAmt: z.number().nullable(),
  startAmtDate: z.date().nullable(),

  /** 中間金 */
  hasInterimAmt: z.boolean(),
  interimAmt: z.number().nullable(),
  interimAmtDate: z.date().nullable(),

  /** 最終金 */
  hasFinalAmt: z.boolean(),
  finalAmt: z.number().nullable(),
  finalAmtDate: z.date().nullable(),
  
  /** 返金有無 */
  hasRefund: z.boolean(),
  
  /** 返金額 */
  refundAmt: z.number().nullable(),

  /** 補助金有無 */
  hasSubsidy: z.boolean(),

  /** 補助金 */
  subsidyAmt: z.number().nullable(),
  
  /** 補助種類 */
  subsidyType: z.enum(subsidyTypes),
  
  /** 支払い方法 */
  payMethod: z.enum(payMethods),
  
  /** 振込先 */
  payDestination: z.string().optional(),

  /** 着手 */
  startDate: z.date().nullable(),
  /** 契約の日から着手までの日数*/
  startDaysAfterContractDate: z.number().nullable(),

  /** 完成 */
  finishDate: z.date().nullable(),
  /** 契約の日から完成までの日数*/
  finishDaysAfterContractDate: z.number().nullable(),
  
  /** 引渡し時期 */
  deliveryDate: z.date().nullable(),

  /** 契約日 */
  contractDate: z.date(),
  
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
  });


export type TypeOfForm = z.infer<typeof schema>;


export default schema;