
import * as Yup from 'yup';



export const initialValues = {
  projId: '',
  projEstimateId: '',
  custGroupId: '',
  projName: '',
  envelopeId: '',
  envelopeStatus: '' as TEnvelopeStatus,
  envDocFileKeys: [] as kintone.fieldTypes.File['value'],
  envSelectedDoc: '',
  revision: '',
  signMethod: '' as TSignMethod,

  //InputFields
  contractPrice: 0,

  //dsEnvIdUkeoi : '',
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