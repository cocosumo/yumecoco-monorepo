import { zodErrorMapJA } from 'kokoas-client/src/lib/zodErrorMapJA';
//import { envelopeStatuses, signMethods } from 'types';
import { z } from 'zod';
import { item } from '../schema';

export const orderMethodChoices = ['印刷', 'メール'] as const;
export type TOrderMethod = typeof orderMethodChoices[number];

z.setErrorMap(zodErrorMapJA());

const emailOrEmptyString = z.string().email()
  .optional()
  .or(z.literal(''));

export const schema = z.object({
  projId: z.string(),
  projName: z.string(),
  storeName: z.string(),
  orderId: z.string()
    .optional(),
  orderDataId: z.string(),
  supplierId: z.string().nonempty({
    message: '業者を選択してください',
  }),
  supplierName: z.string(),
  orderName: z.string().optional(),
  orderDate: z.date(),
  orderMethod: z.enum(orderMethodChoices, 
    {
      required_error: '発注方法を選択してください',
    }),
  supplierOfficerId: z.string(),
  supplierOfficerName: z.string(),
  supplierOfficerTel: z.string(),
  supplierOfficerEmail: emailOrEmptyString,
  emailCc: emailOrEmptyString,
  emailBcc: emailOrEmptyString,
  remarks: z.string().optional(),
  selectedItems: z.array(item),
  expectedDeliveryDate: z.date().nullable(),
}).refine(
  ({ orderMethod, supplierOfficerId }) => {
    return !(orderMethod === 'メール' && !supplierOfficerId);
  }, {
    path: ['supplierOfficerId'],
    message: 'メールアドレスを入力してください',
  },
);


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
  storeName: '',
  orderDate: new Date(),
  orderMethod: '' as TOrderMethod,
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
