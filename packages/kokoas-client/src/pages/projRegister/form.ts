
import {
  TEnvelopeStatus,
  Territory,
  RecordStatus,
  RecordCancelStatus,
  BuildingType,
} from 'types';
import * as Yup from 'yup';

import { postalRegExp } from '../../helpers/yupValidator';


/**
 * Set Initial values here in case MUI is shouting about un/controlled components.
 */
export const initialValues = {
  projId: '' as string | undefined,
  projTypeName: '',
  projTypeId: '',
  projName: '',
  projDataId: '',
  createdDate: '',
  storeCode: '',

  custGroupId: undefined  as undefined | string,
  custName: '',
  storeId: '',
  territory: '' as Territory,


  isAgentConfirmed: false,
  cocoConst1: '',
  cocoConst2: '',
  postal: '',
  address1: '',
  address2: '',
  addressKari: '',
  buildingType: '戸建て' as BuildingType,
  isChkAddressKari: false,
  status: '追客中' as RecordStatus,
  envelopeStatus: '' as TEnvelopeStatus,
  cancelStatus: [] as RecordCancelStatus[],
};

export type TypeOfForm = typeof initialValues;
export type KeysOfForm = keyof TypeOfForm;
export type ProjectDetailsValues = Partial<Record<KeysOfForm, string | number | boolean | Array<any>>>;

export const getFieldName = (fieldName: KeysOfForm) => fieldName;

/**
 * Set Validation for fields that requires it.
 * Refer to YUM documentation.
 */
export const validationSchema =  Yup
  .object<Partial<Record<KeysOfForm, any>>>(
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
