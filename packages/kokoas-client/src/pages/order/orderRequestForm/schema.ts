import { zodErrorMapJA } from 'kokoas-client/src/lib/zodErrorMapJA';
//import { envelopeStatuses, signMethods } from 'types';
import { z } from 'zod';
import { item } from '../schema';


z.setErrorMap(zodErrorMapJA());

export const schema = z.object({
  projId: z.string().uuid(),
  projName: z.string(),
  orderId: z.string().uuid(),
  supplierId: z.string().uuid(),
  supplierName: z.string(),
  orderName: z.string().optional(),
  orderDate: z.date(),
  orderMethod: z.string(),
  emailTo: z.string().email(),
  emailCc: z.string().email()
    .optional(),
  emailBcc: z.string().email()
    .optional(),
  selectedItems: z.array(item),
});


export type TOrderForm = z.infer<typeof schema>;
export type TOrderItem = TOrderForm['selectedItems'][number];

export const initialOrderForm: TOrderForm = {
  projId: '',
  projName: '',
  orderId: '',
  supplierId: '',
  supplierName: '',
  orderName: '',
  orderDate: new Date(),
  orderMethod: '',
  emailTo: '',
  emailCc: '',
  emailBcc: '',
  selectedItems: [
    {
      selected: false,
      itemId: '',
      status: '',
      majorItem: '',
      middleItem: '',
      material: '',
      supplierName: '',
      orderId: '',
      quantity: 0,
      unit: '式',
      costPrice: 0,
      rowCostPriceBeforeTax: 0,
      taxRate: 0.1,
      rowRemarks: '',
    },
  ],
};
