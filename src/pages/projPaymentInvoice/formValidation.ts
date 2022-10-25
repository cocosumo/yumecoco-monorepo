import * as Yup from 'yup';
import { KeyOfForm } from './form';


/* Common validations */
const dateValidation = Yup
  .date()
  .typeError('無効な日付です');

const numberValidation = Yup
  .number()
  .typeError('数字を入力してください');

/* MAIN VALIDATION SCHEMA */

export const validationSchema = Yup
  .object()
  .shape<Partial<Record<KeyOfForm, Yup.AnySchema>>>({

  projContractId: numberValidation,
  billingAmount: numberValidation,
  plannedPaymentDate: dateValidation,
});