import * as Yup from 'yup';
import { getFieldName, KeyOfForm, TKMaterials } from './form';


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
      Yup.object({
        estimateIndex: numberValidation,
        estimateId: Yup.string(),
        contractAmount: numberValidation,
        billingAmount: numberValidation
          .when('isForPayment' as TKMaterials, {
            is: true,
            then: numberValidation.notOneOf([0], '0以外の数値を入力してください'),
          }),
        billedAmount: numberValidation,
        contractDate: dateValidation,
        isForPayment: Yup.boolean(),
      }),
    ),

  plannedPaymentDate: dateValidation
    .when(getFieldName('undecidedPaymentDate'), {
      is: false,
      then: dateValidation.required('入金予定日を設定してください'),
    }),

  exceedChecked: Yup.boolean()
    .when(getFieldName('exceededContract'), {
      is: true,
      then: Yup
        .boolean()
        .oneOf([true], '契約金の超過確認にチェックが入っていません'),
    }),
});