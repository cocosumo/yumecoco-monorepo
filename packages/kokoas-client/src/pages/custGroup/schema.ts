import { zodErrorMapJA } from 'kokoas-client/src/lib/zodErrorMapJA';
import { z } from 'zod';

z.setErrorMap(zodErrorMapJA());

const requiredString = z.string().nonempty({
  message: '必須です。',
});

const customerSchema = z.object({
  custId: z.string(),

  custName: requiredString,

  custNameReading: requiredString,

  gender: z.string(),

  birthYear: z.string(),
  birthMonth: z.string(),
  birthDay: z.string(),

  postal: z.string(),
  address1: z.string(),
  address2: z.string(),

  isSameAddress: z.boolean(),

  phone1: requiredString,
  phone1Rel: requiredString,

  phone2: z.string(),
  phone2Rel: z.string(),

  email: z.string().email()
    .optional()
    .or(z.literal('')),
  emailRel: z.string(),

});

/** MAIN SCHEMA */
export const schema = z.object({
  custGroupId: z.string(),
  store: requiredString,

  cocoAG1: requiredString,
  cocoAG2: z.string(),

  yumeAG1: requiredString,
  yumeAG2: z.string(),

  memo: z.string(),
  customers: z.array(customerSchema)
    .min(1, '顧客情報を入力してください。'),

  isDeleted: z.boolean(),

});

export type TForm = z.infer<typeof schema>;

export type KForm = keyof TForm;

export type TFormCustomer = z.infer<typeof customerSchema>;
export type KFormCustomer = keyof TFormCustomer;

