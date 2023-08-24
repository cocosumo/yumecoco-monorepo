import { zodErrorMapJA } from 'kokoas-client/src/lib/zodErrorMapJA';
import { z } from 'zod';

z.setErrorMap(zodErrorMapJA());

export const schema = z.object({
  projDataId: z.string().optional(),
  custGroupId: z.string().optional(),
  custName: z.string().optional(),
  keyword: z.string().optional(),
  ranks: z.array(z.string()).optional(),
  projName: z.string().optional(),
  contractAmtFrom: z.number({ coerce: true }).nullable(),
  contractAmtTo: z.number({ coerce: true }).nullable(),

});

export type TForm = z.infer<typeof schema>;
export type KForm = keyof TForm;

