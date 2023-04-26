import { z } from 'zod';

const schema = z.object({

  /** 合計契約金額 */
  totalContractAmt: z.number(),
  
  /** 返金有無 */
  hasRefund: z.boolean(),
  
  /** 返金額 */
  refundAmt: z.number().optional(),

  /** 返金日付 */
  refundDate: z.date().optional(),

  /** 補助金有無 */
  hasSubsidy: z.boolean(),

  /** 補助金 */
  subsidyAmt: z.number(),
  
  /** 補助種類 */
  subsidyType: z.enum(['工事に含む', '顧客に返金']),
  
  /** 支払い方法 */
  payMethod: z.enum(['持参', '集金', '振込']),
  
  /** 振込先 */
  payDestination: z.string().optional(),

  /** 着手 */
  startDate: z.date(),
  /** 契約の日から着手までの日数*/
  startDaysAfterContractDate: z.number().optional(),

  /** 完成 */
  finishDate: z.date(),
  /** 契約の日から完成までの日数*/
  finishDaysAfterContractDate: z.number().optional(),
  
  /** 引渡し時期 */
  deliveryDate: z.date().optional(),
  
}).refine((data) => {
  // Check if payMethod is 振込 and payDestination is not provided
  if (data.payMethod === '振込' && !data.payDestination) {
    return false;
  }
  return true;
}, {
  message: 'payDestination is required when payMethod is 振込',
});

export default schema;