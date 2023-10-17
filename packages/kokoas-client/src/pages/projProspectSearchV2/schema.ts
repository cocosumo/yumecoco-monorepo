import { zodErrorMapJA } from 'kokoas-client/src/lib/zodErrorMapJA';
import { orders } from 'types';
import { z } from 'zod';

z.setErrorMap(zodErrorMapJA());

const dateType = z.union([z.string(), z.date()]).nullable()
  .optional();


export const schema = z.object({
  //projDataId: z.string().optional(),
  //custGroupId: z.string().optional(),
  custName: z.string().optional(),
  projName: z.string().optional(),
  cocoAGId: z.string().optional(),

  keyword: z.string().optional(),
  ranks: z.array(z.string()).optional(),
  contractAmtFrom: z.number({ coerce: true })
    .nullable()
    .optional(),
  contractAmtTo: z.number({ coerce: true })
    .nullable()
    .optional(),

  contractDateFrom: dateType,
  contractDateTo: dateType,

  orderBy: z.string().optional(),
  order: z.enum(orders) .optional(),
  memo: z.string().optional(),
});

export type TForm = z.infer<typeof schema>;
export type KForm = keyof TForm;

