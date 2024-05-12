import { zodErrorMapJA } from 'kokoas-client/src/lib/zodErrorMapJA';
//import { envelopeStatuses, signMethods } from 'types';
import { z } from 'zod';
import { invoiceProgress } from 'types/src/common/order';

z.setErrorMap(zodErrorMapJA());



const requiredDateType = z.date({
  required_error: '日付を入力してください。',
  invalid_type_error: '日付を入力してください。',
});

export const item = z.object({
  /** 選択されているかどうか */
  selected: z.boolean(),

  /** 部材のID*/
  itemId: z.string(),
  
  /** 状態 */
  status: z.string().optional(),

  /** 大項目 */
  majorItem: z.string().nonempty(),

  /** 中項目 */
  middleItem: z.string().optional(),
  
  /** 部材 */
  material: z.string().optional(),

  /** 業者名 */
  supplierName: z.string().optional(),

  /* 発注番号 */
  orderId: z.string().optional(),

  /** 発注管理番号 */
  orderDataId: z.string().optional(),

  /** 数量 */
  quantity: z.coerce.number(),
  
  /** 単位 */
  unit: z.string(),

  /** 原価 toB */
  costPrice: z.coerce.number(),

  /** 原価合計 / 発注金額税抜 toB*/
  rowCostPriceBeforeTax: z.number(),

  /** 税 */
  taxRate: z.coerce.number(),

  /** 行備考 */
  rowRemarks: z.string().optional(),
});

export const schema = z.object({
  /** 請求番号 uuid */
  invoiceId: z.string().optional(),
  
  /** 工事番号 uuid */
  projId: z.string(),

  /** 工事名 */
  projName: z.string(),

  /** 請求番号  */
  supplierId: z.string(),

  /** 店舗名 */
  storeName: z.string(),

  /** 発注番号 uuid */
  orderId: z.string().nonempty(),

  /** 発注管理番号 */
  orderDataId: z.string(),

  /** 納品日 */
  deliveryDate: requiredDateType,

  /** 請求締め日 */
  invoiceDueDate: requiredDateType,

  /** 支払日 */
  paymentDate: requiredDateType,

  /** 支払金額 (税抜) */
  invoiceAmount: z.number({
    invalid_type_error: '数値を入力してください。',
  }),

  /** 請求ステータス */
  invoiceStatus: z.enum(invoiceProgress).nullable(),

  /** 項目 */
  items: z.array(item),

});


export type TInvoiceForm = z.infer<typeof schema>;
export type TInvoiceItem = TInvoiceForm['items'][number];
export type KItem = keyof TInvoiceItem;

export const initialInvoiceForm: TInvoiceForm = {
  invoiceId: '',
  projId: '',
  projName: '',
  supplierId: '',
  orderId: '',
  orderDataId: '',
  storeName: '',

  // default to null so MUI date field is controlled.
  // The type is casted to date to avoid type errors. 
  // TODO: check if zod implemented a native way to handle defaults: https://github.com/colinhacks/zod/discussions/1953#discussioncomment-5639176
  deliveryDate: null as unknown as Date,
  invoiceDueDate: null as unknown as Date,
  paymentDate: null as unknown as Date,
  
  invoiceAmount: 0,

  invoiceStatus: null,

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
