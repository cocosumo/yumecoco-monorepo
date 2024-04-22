import { zodErrorMapJA } from 'kokoas-client/src/lib/zodErrorMapJA';
//import { envelopeStatuses, signMethods } from 'types';
import { z } from 'zod';
import { item } from '../schema';

z.setErrorMap(zodErrorMapJA());


export const schema = z.object({
  invoiceId: z.string().optional(),
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
  selectedItems: z.array(item),
  expectedDeliveryDate: z.date().nullable(),
  remarks: z.string().optional(),
});


export type TInvoiceForm = z.infer<typeof schema>;
export type TInvoiceItem = TInvoiceForm['selectedItems'][number];

export const initialInvoiceForm: TInvoiceForm = {
  invoiceId: '',
  projId: '',
  projName: '',
  orderId: '',
  orderDataId: '',
  supplierId: '',
  supplierName: '',
  orderName: '',
  storeName: '',
  orderDate: new Date(),
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
