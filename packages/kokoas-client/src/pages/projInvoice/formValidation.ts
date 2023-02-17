import * as Yup from 'yup';
import { getFieldName, KeyOfForm } from './form';


/* Common validations */
const dateValidation = Yup
  .date()
  .typeError('無効な日付です');

const numberValidation = Yup
  .number()
  .typeError('数字を入力してください');


/* unique validations */
const billingAmountValidation = function (this: any) {
  const {
    contractAmount,
    billingAmount,
    isForPayment,
  } = this.parent;

  if (!isForPayment) return false; // 請求に使用しないときはバリデーションから除外
  if (!billingAmount) return true; // 未入力もしくは0の場合はエラー
  if ((billingAmount >= 0 && contractAmount >= 0)
    || (billingAmount < 0 && contractAmount < 0)) return false;
  return true;
};

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
          .test(
            'with-the-same-plus-or-minus-sign-as-the-contract-amount',
            '契約金額と同じ符号(+, -)で入力してください',
            billingAmountValidation,
          ),
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