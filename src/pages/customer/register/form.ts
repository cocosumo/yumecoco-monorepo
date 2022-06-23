import * as Yup from 'yup';
import { nativeMath, string as randomStr } from 'random-js';
import { phoneRegExp, postalRegExp } from '../../../helpers/yupValidator';

export type KeyOfConstructionDetails = keyof ConstructionDetails.SavedData;
export type ConstructionDetailsValues = Partial<Record<KeyOfConstructionDetails, string | number | boolean>>;

export const initialCustomerValue = {
  key: randomStr()(nativeMath, 5),
  id: '',
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

export type CustomerForm = typeof initialValues;
export type CustomerFormKeys = keyof CustomerForm;
export type CustomerInstance = typeof initialCustomerValue;
export type  CustomerInstanceKeys = (keyof CustomerInstance);

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
    'customers': Yup.array()
      .of(
        Yup.object().shape({
          'custName': Yup.string().required('必須です。'),
          'custNameReading': Yup.string().required('必須です。'),

          'postal': Yup.string()
            .when(['isSameAddress', 'index'] as CustomerInstanceKeys[], {
              is: (isSameAddress: boolean, index: number) => {
                return index === 0 || index > 0 && !isSameAddress;
              },
              then: Yup.string().matches(postalRegExp, '半角数字。例：4418124'),
            }),

          'phone1': Yup.string()
            .when('isSameAddress' as CustomerInstanceKeys, {
              is: false,
              then: Yup.string().matches(phoneRegExp, '半角数字。例：07012641265').required('必須です。'),
            }),

          'phone1Rel': Yup.string()
            .when('isSameAddress' as CustomerInstanceKeys, {
              is: false,
              then: Yup.string().required('連絡先の続柄を選択してください'),
            }),

          'phone2': Yup.string()
            .matches(phoneRegExp, '半角数字。例：07012641265'),
          'phone2Rel': Yup.string()
            .when('phone2', {
              is: (val: string) => !!val,
              then: Yup.string().required('連絡先の続柄を選択してください'),
            }),

          'email': Yup.string()
            .email('有効なメールアドレスを入力ください。例：info@cocosumo.jp'),
          'emailRel': Yup.string()
            .when('email', {
              is: (val: string) => !!val,
              then: Yup.string().required('連絡先の続柄を選択してください。'),
            }),

        } as Partial<Record<CustomerInstanceKeys, any>>),
      ),
  } as Partial<Record<CustomerFormKeys, any>>,
);


export const getCustFieldName = (fieldName : CustomerInstanceKeys) => fieldName;
export const getFieldName = (fieldName: CustomerFormKeys) => fieldName;