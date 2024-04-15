import { zodErrorMapJA } from 'kokoas-client/src/lib/zodErrorMapJA';
//import { envelopeStatuses, signMethods } from 'types';
import { z } from 'zod';
import { item } from '../schema';


z.setErrorMap(zodErrorMapJA());

const emailOrEmptyString = z.string().email()
  .optional()
  .or(z.literal(''));

export const schema = z.object({
  projId: z.string(),
  projName: z.string(),
  orderId: z.string()
    .optional(),
  orderDataId: z.string(),
  supplierId: z.string(),
  supplierName: z.string(),
  orderName: z.string().optional(),
  orderDate: z.date(),
  orderMethod: z.string(),
  supplierOfficerId: z.string(),
  supplierOfficerName: z.string(),
  supplierOfficerTel: z.string(),
  supplierOfficerEmail: emailOrEmptyString,
  emailCc: emailOrEmptyString,
  emailBcc: emailOrEmptyString,
  remarks: z.string().optional(),
  selectedItems: z.array(item),
  expectedDeliveryDate: z.date().nullable(),
}).refine(({ orderMethod, supplierOfficerId }) => {
  if (orderMethod === 'email' && !supplierOfficerId) {
    return false;
  }
  return true;
}, {
  path: ['supplierOfficerEmail'],
  message: 'メールアドレスを入力してください',
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
