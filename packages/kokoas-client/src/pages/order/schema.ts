//import { zodErrorMapJA } from 'kokoas-client/src/lib/zodErrorMapJA';
//import { envelopeStatuses, signMethods } from 'types';
import { z } from 'zod';

export const schema = z.object({
  /** 工事番号 */
  projId: z.string().uuid(),

  /** 部材リスト */
  items: z.array(z.object({
    
    /** 部材のuuid */
    itemId: z.string().uuid(),
    
    /** 状態 */
    status: z.string().optional(),

    /** 大項目 */
    majorItem: z.string().optional(),

    /** 中項目 */
    middleItem: z.string().optional(),
    
    /** 部材 */
    material: z.string().optional(),

    /** 数量 */
    quantity: z.coerce.number(),

    /**利益率 */
    materialProfRate: z.coerce.number(),
    
    /** 単位 */
    unit: z.string().nullable(),

    /** 単価 toC */
    unitPrice: z.coerce.number(),

    /** 金額税抜き toC */
    rowUnitPriceBeforeTax: z.number(),

    /** 金額税込み toC */
    rowUnitPriceAfterTax: z.number(),

    /** 原価 toB */
    costPrice: z.coerce.number(),

    /** 原価合計 / 発注金額税抜 toB*/
    rowCostPriceBeforeTax: z.number(),

    /** 原価合計 / 発注金額税込 toB*/
    rowCostPriceAfterTax: z.number(),
  })),
});

export type TForm = z.infer<typeof schema>;