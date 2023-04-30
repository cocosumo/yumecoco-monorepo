import { z } from 'zod';

const schema = z.object({

  /** 工事のuuid */
  projId: z.string().uuid(),

  /** 工事名 */
  projName: z.string(),

  /** 契約のuuid */
  contractId: z.string().uuid(),

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
  subsidyType: z.enum(['工事に含む', '顧客に返金']),
  
  /** 支払い方法 */
  payMethod: z.enum(['持参', '集金', '振込']),
  
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
  
}).refine((data) => {
  // Check if payMethod is 振込 and payDestination is not provided
  if (data.payMethod === '振込' && !data.payDestination) {
    return false;
  }
  return true;
}, {
  message: 'payDestination is required when payMethod is 振込',
});


export type TypeOfForm = z.infer<typeof schema>;

export default schema;