
import { TEnvelopeStatus } from 'types';
import * as Yup from 'yup';
import { RecordStatus, RecordCancelStatus } from '../../config/formValues';
import { postalRegExp } from '../../helpers/yupValidator';


export type BuildingTypeVals =
| '戸建て'
| 'マンション'
| '店舗/事務所'
| 'その他';


/**
 * Set Initial values here in case MUI is shouting about un/controlled components.
 */
export const initialValues = {
  recordId: '' as string | undefined,
  custGroupId: undefined  as undefined | string,
  storeId: '',
  territory: '',
  projTypeName: '',
  projTypeId: '',
  projName: '',
  isAgentConfirmed: false,
  cocoConst1: '',
  cocoConst2: '',
  postal: '',
  address1: '',
  address2: '',
  addressKari: '',
  buildingType: '戸建て' as BuildingTypeVals,
  isChkAddressKari: false,
  status: '追客中' as RecordStatus,
  envelopeStatus: '' as TEnvelopeStatus,
  cancelStatus: [] as RecordCancelStatus[],
};

export type TypeOfProjForm = typeof initialValues;
export type KeyOfProjForm = keyof TypeOfProjForm;
export type ProjectDetailsValues = Partial<Record<KeyOfProjForm, string | number | boolean | Array<any>>>;

export const getFieldName = (fieldName: KeyOfProjForm) => fieldName;

/**
 * Set Validation for fields that requires it.
 * Refer to YUM documentation.
 */
export const validationSchema =  Yup
  .object<Partial<Record<KeyOfProjForm, any>>>(
  {
    custGroupId: Yup
      .string()
      .required('必須です。'),

    projTypeId: Yup
      .string()
      .required('必須です。'),
    projName: Yup
      .string()
      .required('必須です。'),
    cocoConst1: Yup
      .string()
      .required('必須です。'),
    postal: Yup
      .string()
      .matches(postalRegExp, '半角数字。例：4418124')
      .required('必須です。'),
    address1: Yup
      .string()
      .required('必須です。'),
    address2: Yup
      .string()
      .required('必須です。'),
  },
);
