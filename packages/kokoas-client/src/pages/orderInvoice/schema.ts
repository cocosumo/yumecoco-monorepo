import { zodErrorMapJA } from 'kokoas-client/src/lib/zodErrorMapJA';
import { invoiceProgress } from 'types/src/common/order';
import { z } from 'zod';

z.setErrorMap(zodErrorMapJA());

const schema = z.object({
  status: z.enum(invoiceProgress).optional(),
  projName: z.string().optional(),
  storeName: z.string().optional(),
  cocoAgName: z.string().optional(),
  supplierName: z.string().optional(),
  invoiceSystemNumber: z.string().optional(),
  orderAmount: z.number().optional(),
  invoiceAmount: z.number().optional(),
  invoiceDateFrom: z.date().optional(),
  invoiceDateTo: z.date().optional(),
});


export type TypeOfForm = z.infer<typeof schema>;
export type KeyOfForm = keyof TypeOfForm;

export default schema;