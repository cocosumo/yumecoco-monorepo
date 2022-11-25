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

  estimates: Yup.array()
    .of(
      Yup.object().shape({
        estimateId: numberValidation,
        contractAmount: numberValidation,
        contractDate: dateValidation,
        doNotUsePayment: Yup.boolean(),
      }),
    ),
  contractAmount: numberValidation,
  billingAmount: numberValidation,
  billedAmount: numberValidation,
  plannedPaymentDate: dateValidation,
  exceedChecked: Yup.boolean()
    .when(['contractAmount', 'billingAmount', 'BilledAmount'], {
      is: (contractAmount: number, billingAmount: number, BilledAmount:number) => {
        return contractAmount < (billingAmount + BilledAmount);
      },
      then: Yup.boolean().required('契約金の超過確認にチェックが入っていません'),
    }),
});