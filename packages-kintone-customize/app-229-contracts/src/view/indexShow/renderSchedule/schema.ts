import { territories } from 'types';
import { z } from 'zod';

export const territoryChoices = ['全店舗', ...territories ] as const;

export const schema = z.object({
  fiscalYear: z.number(),
  territory: z.enum(territoryChoices),
});

export type TForm = z.infer<typeof schema>;

export type KForm = keyof TForm;