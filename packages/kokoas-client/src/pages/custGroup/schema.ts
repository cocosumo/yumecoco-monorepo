import { zodErrorMapJA } from 'kokoas-client/src/lib/zodErrorMapJA';
import { z } from 'zod';

z.setErrorMap(zodErrorMapJA());

const customerSchema = z.object({
  custId: z.string(),

  custName: z.string().nonempty(),
  custNameReading: z.string().nonempty(),

  gender: z.string(),

  birthYear: z.string(),
  birthMonth: z.string(),
  birthDay: z.string(),

  postal: z.string(),
  address1: z.string(),
  address2: z.string(),

  isSameAddress: z.boolean(),

  phone1: z.string(),
  phone1Rel: z.string(),

  phone2: z.string(),
  phone2Rel: z.string(),

  email: z.string(),
  emailRel: z.string(),

});

/** MAIN SCHEMA */
const schema = z.object({
  custGroupId: z.string(),
  store: z.string(),
  cocoAG1: z.string().nonempty(),
  cocoAG2: z.string().nonempty(),
  yumeAG1: z.string().nonempty(),
  yumeAG2: z.string().nonempty(),
  memo: z.string().nonempty(),
  customers: z.array(customerSchema),

  isDeleted: z.boolean(),

});

export type TForm = z.infer<typeof schema>;

export type KForm = keyof TForm;

export type TFormCustomer = z.infer<typeof customerSchema>;
export type KFormCustomer = keyof TFormCustomer;

