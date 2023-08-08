import { z } from 'zod';

export const schema = z.object({
  contractId: z.string(),
  financingMethod: z.string(),
  financialInstitution: z.string(),
  branchName: z.string(),
  tel: z.string(),
  fax: z.string(),

});

export type TForm = z.infer<typeof schema>;
export type KForm = keyof TForm;