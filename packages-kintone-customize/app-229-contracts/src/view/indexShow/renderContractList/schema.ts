import { z } from 'zod';

export const schema = z.object({
  year: z.number(),
  month: z.number(),
});

export type TForm = z.infer<typeof schema>;

export type KForm = keyof TForm;