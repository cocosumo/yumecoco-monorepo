import { KeysOfForm } from './form';
import * as Yup from 'yup';
import { postalRegExp } from '../../helpers/yupValidator';


/**
 * Set Validation for fields that requires it.
 * Refer to YUM documentation.
 */
export const validationSchema =  Yup
  .object<Partial<Record<KeysOfForm, Yup.AnySchema>>>(
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
