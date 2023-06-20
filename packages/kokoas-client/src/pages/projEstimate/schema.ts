import { zodErrorMapJA } from 'kokoas-client/src/lib/zodErrorMapJA';
import { z } from 'zod';

z.setErrorMap(zodErrorMapJA());

export const estStatusChoices = [ '契約', '銀行用', '工事実行', '追加', '追加減額'] as const;

export type EstStatusChoices = typeof estStatusChoices[number];

const schema = z.object({
  custGroupId : z.string(),
  customerName : z.string().nullable(),
  createdDate : z.date().nullable(),

  estimateId: z.string().optional(),
  estimateDataId: z.string().nullable(),
  estimateRevision: z.string().nullable(),
  envStatus: z.string().nullable(),

  projDataId: z.string(),
  projId: z.string(),
  projName: z.string(),

  projTypeId: z.string().nullable(),
  projTypeName: z.string().nullable(),
  projTypeProfit: z.number().max(100),

  projTypeProfitLatest: z.number(),
  status: z.enum(estStatusChoices),
  taxRate: z.number().max(100),

  items: z.array(z.object({
    majorItem: z.string().nullable(),
    middleItem: z.string().nullable(),
    material: z.string().nullable(),
    materialDetails: z.string().nullable(),
    rowCostPrice: z.number(),
    rowUnitPriceBeforeTax: z.number(),
    rowUnitPriceAfterTax: z.number(),
    unit: z.string().nullable(),
    costPrice: z.coerce.number(),
    quantity: z.coerce.number(),
    unitPrice: z.coerce.number(),
    materialProfRate: z.coerce.number(),
    rowDetails: z.string().nullable(),
  })),

  remarks: z.string().nullable(),
});

export type TForm = z.infer<typeof schema>;
export type KForm = keyof TForm;
export type TItems = TForm['items'];
export type TItem = TItems[number];
export type KItem = keyof TItem;

export default schema;