import { zodErrorMapJA } from 'kokoas-client/src/lib/zodErrorMapJA';
//import { envelopeStatuses, signMethods } from 'types';
import { z } from 'zod';
import { item } from '../schema';

z.setErrorMap(zodErrorMapJA());

const requiredDateType = z.date({
  required_error: '日付を入力してください。',
  invalid_type_error: '日付を入力してください。',
});

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
  deliveryDate: requiredDateType,

  /** 請求締め日 */
  invoiceDeadlineDate: requiredDateType,

  /** 支払日 */
  paymentDate: requiredDateType,

  /** 支払金額 (税抜) */
  invoiceAmount: z.number({
    invalid_type_error: '数値を入力してください。',
  }),

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

  // default to null so MUI date field is controlled.
  // The type is casted to date to avoid type errors. 
  // TODO: check if zod implemented a native way to handle defaults: https://github.com/colinhacks/zod/discussions/1953#discussioncomment-5639176
  deliveryDate: null as unknown as Date,
  invoiceDeadlineDate: null as unknown as Date,
  paymentDate: null as unknown as Date,
  
  invoiceAmount: 0,
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
