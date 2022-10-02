
import * as Yup from 'yup';



const initPayFields = {
  checked: false,
  amount: 0,
  date: '' as Date | '',
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
    
    paymentFields: Yup.array()
      .of(
        Yup.object<Record<keyof TypeOfPayFields, Yup.AnySchema>>()
          .shape({
            amount: Yup
              .number()
              .when(getPayFieldName('checked'), {
                is: true,
                then: Yup
                  .number()
                  .typeError('数字を入れてください。')
                  .required('金額を入力してください。'),
              }),
            date: Yup
              .date()
              .when([getPayFieldName('checked'), getFieldName('submitMethod'), 'projId'], {
                is: (checked: boolean, submitMethod: TypeOfForm['submitMethod'], projId) => {
                  console.log(checked, submitMethod, projId);
                  return checked && submitMethod === 'contract';
                },
                then: Yup.date().required('契約では必須です。'),
              }),
        
          }),
      ),
    remainingAmt: Yup
      .number()
      .equals([0], '契約合計と請求額が相違しています。'),
  });