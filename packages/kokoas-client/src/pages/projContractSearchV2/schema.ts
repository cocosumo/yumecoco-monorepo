import { zodErrorMapJA } from 'kokoas-client/src/lib/zodErrorMapJA';
import { z } from 'zod';

z.setErrorMap(zodErrorMapJA());

export const schema = z.object({
  orderBy: z.string().optional(),
  order: z.enum(['asc', 'desc']).optional(),
  custName: z.string().optional(),

  contractDateFrom: z.date().nullable(),
  contractDateTo: z.date().nullable(),
  amountFrom: z.number({ coerce: true }).nullable(),
  amountTo: z.number({ coerce: true }).nullable(),
  mainSearch: z.string().optional(),
  contractCompleted: z.boolean(),
  contractIncomplete: z.boolean(),
  
  projTypes: z.array(z.string()).optional(),
  stores: z.array(z.string()).optional(),
}).superRefine((data) => {
  if (data.contractDateFrom && data.contractDateTo) {
    if (data.contractDateFrom > data.contractDateTo) {
      return {
        contractDateFrom: '契約日（から）は契約日（まで）より前である必要があります',
        contractDateTo: '契約日（から）は契約日（まで）より前である必要があります',
      };
    }
  }
  if (data.amountFrom && data.amountTo) {
    if (data.amountFrom > data.amountTo) {
      return {
        amountFrom: '最小金額は最大金額より小さい必要があります',
        amountTo: '最小金額は最大金額より小さい必要があります',
      };
    }
  }
  return true;
});

export type TForm = z.infer<typeof schema>;
export type KForm = keyof TForm;

