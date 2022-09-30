
import * as Yup from 'yup';



const initPayFields = {
  checked: false,
  amount: 0,
  date: '',
};

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
  keiyakukin_chk: false,
  keiyakukin_amt: 0,
  keiyakukin_date: '',

  chakushukin_chk: false,
  chakushukin_amt: 0,
  chakushukin_date: '',

  chuukankin_chk: false,
  chuukankin_amt: 0,
  chuukankin_date: '',

  saishuukin_chk: false,
  saishuukin_amt: 0,
  saishuukin_date: '',


};

export type TypeOfForm =  typeof initialValues;
export type KeyOfForm = keyof TypeOfForm;
export type TypeOfPayFields = typeof initPayFields;

export const getFieldName = (s: KeyOfForm) => s;

export const validationSchema =  Yup.object(
  {
    'projId': Yup
      .string(),
  } as Partial<Record<KeyOfForm, any>>,
);