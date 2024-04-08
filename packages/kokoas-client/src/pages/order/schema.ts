import { zodErrorMapJA } from 'kokoas-client/src/lib/zodErrorMapJA';
//import { envelopeStatuses, signMethods } from 'types';
import { z } from 'zod';

z.setErrorMap(zodErrorMapJA());

export const schema = z.object({
  /** 工事番号 */
  projId: z.string().uuid(),

  /** 工事名 */
  projName: z.string(),

  /** 店舗名 */
  storeName: z.string(),

  /** revision */
  revision: z.string().optional(),

  /** 部材リスト */
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

export type TForm = z.infer<typeof schema>;
export type KForm = keyof TForm;
export type TItems = TForm['items'];
export type TItem = TItems[number];
export type KItem = keyof TItem;