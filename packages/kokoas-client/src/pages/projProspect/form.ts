
import { dateValidation } from 'kokoas-client/src/helpers/yupValidator';
import { TEnvelopeStatus } from 'types';
import * as Yup from 'yup';

export const initialValues = {
  projId: '',
  custGroupId: '',
  envelopeStatus: '' as TEnvelopeStatus,
  projName: '',
  rank: '',
  schedContractPrice: '',
  estatePurchaseDate: '' as Date | string,
  planApplicationDate: '' as Date | string,
  schedContractDate : '' as Date | string,
  memo: '',
};

export type TypeOfForm =  typeof initialValues;
export type KeyOfForm = keyof TypeOfForm;

export const getFieldName = (s: KeyOfForm) => s;

export const validationSchema =  Yup.object(
  {
    'projId': Yup
      .string()
      .required('必須です。'),
    'estatePurchaseDate': dateValidation,
    'planApplicationDate': dateValidation,
    'schedContractDate': dateValidation,
  } as Partial<Record<KeyOfForm, any>>,
);