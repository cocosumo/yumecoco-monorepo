import { territories } from 'types';
import { z } from 'zod';

export const schema = z.object({
  fiscalYear: z.number(),
  territory: z.enum(territories),
});

export type TForm = z.infer<typeof schema>;

export type KForm = keyof TForm;