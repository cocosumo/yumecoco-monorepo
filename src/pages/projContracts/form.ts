
import * as Yup from 'yup';



const initPayFields = {
  checked: false,
  amount: 0,
  payDate: '' as Date | '',
};
export type TypeOfPayFields = typeof initPayFields;

export const initialValues = {
  /* Form management */
  submitMethod: 'normal' as 'normal' | 'contract',

  /* 工事 */
  projId: '',
  projEstimateId: '',
  projName: '',
  projAddress: '',

  /* 顧客 */
  custGroupId: '',
  custName: '',
  custAddress: '',

  /* 担当 */
  store: '',
  cocoAg: '',
  yumeAg: '',
  constAg: '',

  /* 見積も契約 */
  envelopeId: '',
  envelopeStatus: '' as TEnvelopeStatus,
  envDocFileKeys: [] as kintone.fieldTypes.File['value'],
  envSelectedDoc: '',
  revision: '',
  signMethod: '' as TSignMethod,

  contractPrice: 0,

  /* 支払い予定 */
  paymentFields: Array<TypeOfPayFields>(4)
    .fill(initPayFields),
  remainingAmt: 0,
  hasRefund: false,
  refundAmt: '' as number | '',

  projEstimateRevision: '',


};

export type TypeOfForm =  typeof initialValues;
export type KeyOfForm = keyof TypeOfForm;


export const paymentLabels = ['契約金', '着手金', '中間金', '最終金'] as const; 
export type TPaymentLabels = typeof paymentLabels[number];
export const getFieldName = (s: KeyOfForm) => s;
export const getPayFieldNameByIdx = (
  field: keyof TypeOfPayFields,
  idx: number,
) => {
  return `${getFieldName('paymentFields')}.${idx}.${field}`;
};
const getPayFieldName = (k: keyof TypeOfPayFields) => k;


/* VALIDATION */
const payAmtValidation = Yup
  .number()
  .when(getPayFieldName('checked'), {
    is: true,
    then: Yup
      .number()
      .typeError('数字を入れてください。')
      .required('金額を入力してください。'),
  });

const payDateValidation =  Yup
  .date()
  .typeError('無効な日付です');
  
export const validationSchema =  Yup
  .object <Record<KeyOfForm, Yup.AnySchema>>()
  .shape({
    projEstimateId: Yup.string().required(),
    refundAmt: Yup
      .number()
      .when(getFieldName('hasRefund'), {
        is: true,
        then: Yup
          .number()
          .typeError('数字を入れてください。')
          .required('返金予定金額を入力してください'),
      }),
    
    paymentFields: Yup
      .array()
      .when(getFieldName('submitMethod'), {
        is: (sM: TypeOfForm['submitMethod']) => sM === 'normal',
        then: Yup.array().of(
          Yup
            .object()
            .shape<Partial<Record<keyof TypeOfPayFields, Yup.AnySchema>>>({
            amount: payAmtValidation,
            payDate: Yup
              .date()
              .when(getPayFieldName('checked'), {
                is: true,
                then: payDateValidation
                  .notRequired(),
              }),
          }),
        ),
      })
      .when(getFieldName('submitMethod'), {
        is: (sM: TypeOfForm['submitMethod']) => sM === 'contract',
        then: Yup.array().of(
          Yup
            .object()
            .shape<Partial<Record<keyof TypeOfPayFields, Yup.AnySchema>>>({
            amount: payAmtValidation,
            payDate: Yup
              .date()
              .when(getPayFieldName('checked'), {
                is: true,
                then: payDateValidation
                  .required('契約では必須です。'),
              }),
          }),
        ),
      }),

    remainingAmt: Yup
      .number()
      .typeError('数字ではないものが入っています。確認してください。')
      .equals([0], '契約合計と請求額が相違しています。'),
  });
