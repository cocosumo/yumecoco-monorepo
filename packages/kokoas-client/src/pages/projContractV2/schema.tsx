import { z } from 'zod';

const schema = z.object({

  totalContractAmt: z.number(),
  hasRefund: z.boolean(),
  refundAmt: z.number().optional(),
  refundDate: z.date().optional(),

  hasSubsidy: z.boolean(),
  subsidyAmt: z.number(),
  subsidyDate: z.date(),
  subsidyType: z.enum(['工事に含む', '顧客に返金']),

  payMethod: z.enum(['持参', '集金', '振込']),
  payDestination: z.string().optional(),

  startDate: z.date(),
  finishDate: z.date(),

  startDaysAfterContractDate: z.number().optional(),
  finishDaysAfterContractDate: z.number().optional(),
  
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