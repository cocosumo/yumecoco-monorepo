
import { nativeMath, string as randomStr } from 'random-js';

export const initialCustomerValue = {
  key: randomStr()(nativeMath, 5),
  custId: '',
  index: 0,
  revision: '',
  custName: '',
  isSameAddress: false,
  custNameReading: '',
  gender: '',
  birthYear: '',
  birthMonth: '',
  birthDay: '',
  postal: '',
  address1: '',
  address2: '',
  phone1: '',
  phone1Rel: '',
  phone2: '',
  phone2Rel: '',
  email: '',
  emailRel: '',
} ;

/**
 * Set Initial values here in case MUI is shouting about un/controlled components.
 */
export const initialValues = {
  id: '' as undefined | string,
  revision: '',
  store: '',
  cocoAG1: '',
  cocoAG2: '',
  yumeAG1: '',
  yumeAG2: '',
  customers: [initialCustomerValue],
  isDeleted: '',
} ;



export type TypeOfForm = typeof initialValues;
export type KeyOfForm = keyof TypeOfForm;
export type CustomerInstance = typeof initialCustomerValue;
export type  CustomerInstanceKeys = (keyof CustomerInstance);

export const getCustFieldName = (fieldName : CustomerInstanceKeys) => fieldName;
export const getFieldName = (fieldName: KeyOfForm) => fieldName;