import { zodErrorMapJA } from 'kokoas-client/src/lib/zodErrorMapJA';
//import { envelopeStatuses, signMethods } from 'types';
import { z } from 'zod';


z.setErrorMap(zodErrorMapJA());

export const schema = z.object({
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
  items: z.array(z.object({
    /** 部材のuuid */
    itemId: z.string().optional(),
    
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
  })),
});


export type TOrderForm = z.infer<typeof schema>;
export type TOrderItem = TOrderForm['items'][number];

export const initialOrderForm: TOrderForm = {
  orderId: '',
  supplierId: '',
  supplierName: '',
  orderName: '',
  orderDate: new Date(),
  orderMethod: '',
  emailTo: '',
  emailCc: '',
  emailBcc: '',
  items: [
    {
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
