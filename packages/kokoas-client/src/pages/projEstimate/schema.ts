import { zodErrorMapJA } from 'kokoas-client/src/lib/zodErrorMapJA';
import { z } from 'zod';

z.setErrorMap(zodErrorMapJA());

const schema = z.object({
  custGroupId : z.string().nullable(),
  customerName : z.string().nullable(),
  createdDate : z.date().nullable(),

  estimateId: z.string().nullable(),
  estimateDataId: z.string().nullable(),
  estimateRevision: z.string().nullable(),
  envStatus: z.string().nullable(),

  projDataId: z.string().nullable(),
  projId: z.string().nullable(),
  projName: z.string().nullable(),

  projTypeId: z.string().nullable(),
  projTypeName: z.string().nullable(),
  projTypeProfit: z.number().max(100),

  projTypeProfitLatest: z.number(),
  status: z.string().nullable(),
  taxRate: z.number().max(100),

  items: z.array(z.object({
    costPrice: z.number(),
    materialProfRate: z.number().max(100),
    majorItem: z.string().nullable(),
    middleItem: z.string().nullable(),
    material: z.string().nullable(),
    materialDetails: z.string().nullable(),
    quantity: z.number(),
    rowCostPrice: z.number(),
    rowUnitPriceBeforeTax: z.number(),
    rowUnitPriceAfterTax: z.number(),
    unit: z.string().nullable(),
    unitPrice: z.number(),
    rowDetails: z.string().nullable(),
  })),
});

export type TForm = z.infer<typeof schema>;
export type KForm = keyof TForm;
export type TItems = TForm['items'];
export type TItem = TItems[number];
export type KItem = keyof TItem;

export default schema;