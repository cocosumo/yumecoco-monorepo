
import * as Yup from 'yup';



const initPayFields = {
  checked: false,
  amount: 0,
  date: '' as Date | '',
};
export type TypeOfPayFields = typeof initPayFields;

export const initialValues = {

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
  hasRefund: false,


};

export type TypeOfForm =  typeof initialValues;
export type KeyOfForm = keyof TypeOfForm;


export const paymentLabels = ['契約金', '着手金', '中間金', '最終金'] as const; 
export type TPaymentLabels = typeof paymentLabels[number];
export const getFieldName = (s: KeyOfForm) => s;
export const getPayFieldName = (
  field: keyof TypeOfPayFields,
  idx: number,
) => {
  return `${getFieldName('paymentFields')}.${idx}.${field}`;
};


export const validationSchema =  Yup.object(
  {
    'projId': Yup
      .string(),
  } as Partial<Record<KeyOfForm, any>>,
);