import { TForm, TFormCustomer } from './schema';

export const initCustomerValue: TFormCustomer = {
  custId: '',
  custName: '',
  custNameReading: '',
  gender: '',
  birthYear: '',
  birthMonth: '',
  birthDay: '',
  postal: '',
  address1: '',
  address2: '',
  isSameAddress: false,
  phone1: '',
  phone1Rel: '契約者',
  phone2: '',
  phone2Rel: '契約者',
  email: '',
  emailRel: '契約者',
  
};


export const initialValues : TForm = {
  custGroupId: '',
  store: '',
  cocoAG1: '',
  cocoAG2: '',
  yumeAG1: '',
  yumeAG2: '',

  memo: '',

  customers: [initCustomerValue],
  
  isDeleted: false,
};