import { zodErrorMapJA } from 'kokoas-client/src/lib/zodErrorMapJA';
//import { envelopeStatuses, signMethods } from 'types';
import { z } from 'zod';
import { item } from '../schema';

z.setErrorMap(zodErrorMapJA());


export const schema = z.object({
  /** 請求番号 uuid */
  invoiceId: z.string().optional(),
  
  /** 工事番号 uuid */
  projId: z.string(),

  /** 工事名 */
  projName: z.string(),

  /** 店舗名 */
  storeName: z.string(),

  /** 発注番号 uuid */
  orderId: z.string()
    .optional(),

  /** 発注管理番号 */
  orderDataId: z.string(),

  /** 納品日 */
  deliveryDate: z.date(),

  /** 請求締め日 */
  invoiceDeadlineDate: z.date(),

  /** 支払日 */
  paymentDate: z.date(),

  /** 支払金額 (税抜) */
  invoicePaymentAmount: z.number(),

  /** 項目 */
  items: z.array(item),

});


export type TInvoiceForm = z.infer<typeof schema>;
export type TInvoiceItem = TInvoiceForm['items'][number];

export const initialInvoiceForm: TInvoiceForm = {
  invoiceId: '',
  projId: '',
  projName: '',
  orderId: '',
  orderDataId: '',
  storeName: '',
  deliveryDate: null as unknown as Date,
  invoiceDeadlineDate: null as unknown as Date,
  paymentDate: null as unknown as Date,
  invoicePaymentAmount: 0,
  items: [
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
