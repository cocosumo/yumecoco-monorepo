import * as Yup from 'yup';



export type KeyOfConstructionDetails = keyof ConstructionDetails.SavedData;
export type ConstructionDetailsValues = Partial<Record<KeyOfConstructionDetails, string | number | boolean>>;

enum CustomerFieldNames  {
  'custName',
  'custNameReading',
  'gender',
  'birthYear',
  'birthMonth',
  'birthDay',
  'postal',
  'address1',
  'address2',
  'phone1',
  'phone1Type',
  'phone2',
  'phone2Type',
  'email',
  'isSameAddress',
}

type Customer = {
  [K in keyof typeof CustomerFieldNames ]: string | boolean;
};

export const initialCustomerValue: Customer = {
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
};

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
};

export type CustomerForm = typeof initialValues;
export type CustomerFormKeys = keyof CustomerForm;
export type  CustomerInstanceKeys = (keyof typeof CustomerFieldNames);

/**
 * Set Validation for fields that requires it.
 * Refer to YUM documentation.
 */
export const validationSchema =  Yup.object(
  {
    custGroupId: Yup
      .string()
      .required('必須です。'),
    postal: Yup
      .string()
      .required('必須です。'),
  } as Partial<Record<KeyOfConstructionDetails, any>>,
);


export const getFieldName = (fieldName : CustomerInstanceKeys) => fieldName;