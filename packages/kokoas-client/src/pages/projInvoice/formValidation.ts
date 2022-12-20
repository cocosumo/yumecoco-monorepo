import * as Yup from 'yup';
import { KeyOfForm, TKMaterials } from './form';


/*  */
const keys: TKMaterials[] = ['contractAmount', 'billingAmount', 'billedAmount'];

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

  estimates: Yup.array()
    .of(
      Yup.object().shape({
        estimateIndex: numberValidation,
        estimateId: numberValidation,
        contractAmount: numberValidation,
        billingAmount: numberValidation.required('必須入力項目'),
        billedAmount: numberValidation,
        contractDate: dateValidation,
        doNotUsePayment: Yup.boolean(),
      }),
    ),

  plannedPaymentDate: dateValidation
    .when(keys, {
      is: (plannedPaymentDate: string, undecidedPaymentDate: boolean) => {
        return (!plannedPaymentDate && !undecidedPaymentDate);
      },
      then: dateValidation.required('入金予定日を設定してください'),
    }),

  exceedChecked: Yup.boolean()
    .when(keys, {
      is: (contractAmount: number, billingAmount: number, billedAmount: number) => {
        return Boolean(contractAmount < (billingAmount + billedAmount));
      },
      then: Yup.boolean().required().oneOf([true], '契約金の超過確認にチェックが入っていません'),
    }),
});