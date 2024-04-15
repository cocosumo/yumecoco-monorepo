import { zodErrorMapJA } from 'kokoas-client/src/lib/zodErrorMapJA';
//import { envelopeStatuses, signMethods } from 'types';
import { z } from 'zod';
import { item } from '../schema';


z.setErrorMap(zodErrorMapJA());

export const schema = z.object({
  projId: z.string().uuid(),
  projName: z.string(),
  orderId: z.string().uuid(),
  orderDataId: z.string(),
  supplierId: z.string().uuid(),
  supplierName: z.string(),
  orderName: z.string().optional(),
  orderDate: z.date(),
  orderMethod: z.string(),
  supplierOfficerId: z.string().nonempty(),
  supplierOfficerName: z.string(),
  supplierOfficerTel: z.string(),
  supplierOfficerEmail: z.string().email()
    .nonempty(),
  emailCc: z.string().email()
    .optional(),
  emailBcc: z.string().email()
    .optional(),
  remarks: z.string().optional(),
  selectedItems: z.array(item),
  expectedDeliveryDate: z.date().nullable(),
});


export type TOrderForm = z.infer<typeof schema>;
export type TOrderItem = TOrderForm['selectedItems'][number];

export const initialOrderForm: TOrderForm = {
  projId: '',
  projName: '',
  orderId: '',
  orderDataId: '',
  supplierId: '',
  supplierName: '',
  orderName: '',
  orderDate: new Date(),
  orderMethod: '',
  supplierOfficerId: '',
  supplierOfficerEmail: '',
  supplierOfficerName: '',
  supplierOfficerTel: '',
  emailCc: '',
  emailBcc: '',
  expectedDeliveryDate: null,
  remarks: '',
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
