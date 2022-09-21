
import * as Yup from 'yup';



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

};

export type TypeOfForm =  typeof initialValues;
export type KeyOfForm = keyof TypeOfForm;

export const getFieldName = (s: KeyOfForm) => s;

export const validationSchema =  Yup.object(
  {
    'projId': Yup
      .string(),
  } as Partial<Record<KeyOfForm, any>>,
);