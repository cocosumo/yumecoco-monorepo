import { z } from 'zod';

export const schema = z.object({
  year: z.string(),
  months: z.array(z.string()),
  stores: z.string().optional(),
});

export type TForm = z.infer<typeof schema>;

export type KForm = keyof TForm;