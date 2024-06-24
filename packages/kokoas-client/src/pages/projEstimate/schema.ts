import { zodErrorMapJA } from 'kokoas-client/src/lib/zodErrorMapJA';
import { z } from 'zod';

z.setErrorMap(zodErrorMapJA());

export const estStatusChoices = [ '契約', '銀行用', '工事実行', '追加', '追加減額'] as const;

export type EstStatusChoices = typeof estStatusChoices[number];

const schema = z.object({
  hasOnProcessContract: z.boolean(),
  contractId: z.string().optional(),
  custGroupId : z.string(),
  customerName : z.string().optional(),
  createdDate : z.date().optional(),

  estimateId: z.string().optional(),
  estimateDataId: z.string().optional(),
  estimateRevision: z.string().optional(),
  envStatus: z.string().optional(),

  projDataId: z.string(),
  projId: z.string(),
  projName: z.string(),

  projTypeId: z.string().optional(),
  projTypeName: z.string().nullable(),
  projTypeProfit: z.number().max(100),

  projTypeProfitLatest: z.number(),
  status: z.enum(estStatusChoices),
  taxRate: z.number().max(100),

  items: z.array(z.object({
    selected: z.boolean(),
    itemId: z.string(),
    majorItem: z.string().nonempty(),
    middleItem: z.string().optional(),
    material: z.string().optional(),
    materialDetails: z.string().optional(),
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

  remarks: z.string(),
});

export type TForm = z.infer<typeof schema>;
export type KForm = keyof TForm;
export type TItems = TForm['items'];
export type TItem = TItems[number];
export type KItem = keyof TItem;

export default schema;