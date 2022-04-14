import * as Yup from 'yup';
import { nativeMath, string as randomStr } from 'random-js';

export type KeyOfConstructionDetails = keyof ConstructionDetails.SavedData;
export type ConstructionDetailsValues = Partial<Record<KeyOfConstructionDetails, string | number | boolean>>;

export const initialCustomerValue = {
  key: randomStr()(nativeMath, 5),
  custName: '',
  isSameAddress: true,
  custNameReading: '',
  gender: '',
  birthYear: '',
  birthMonth: '',
  birthDay: '',
  postal: '',
  address1: '',
  address2: '',
  phone1: '',
  phone1Type: '',
  phone2: '',
  phone2Type: '',
  email: '',
  emailType: '',
} ;

/**
 * Set Initial values here in case MUI is shouting about un/controlled components.
 */
export const initialValues = {
  store: '',
  cocoAG1: '',
  cocoAG2: '',
  yumeAG1: '',
  yumeAG2: '',
  customers: [initialCustomerValue],
} ;

export type CustomerForm = typeof initialValues;
export type CustomerFormKeys = keyof CustomerForm;
export type  CustomerInstanceKeys = (keyof typeof initialCustomerValue);

/**
 * Set Validation for fields that requires it.
 * Refer to YUM documentation.
 */
export const validationSchema =  Yup.object().shape(
  {
    'store' : Yup
      .string()
      .required('必須です。'),
    'cocoAG1' : Yup
      .string()
      .required('必須です。'),


  } as Partial<Record<CustomerFormKeys, any>>,
);


export const getCustFieldName = (fieldName : CustomerInstanceKeys) => fieldName;
export const getFieldName = (fieldName: CustomerFormKeys) => fieldName;