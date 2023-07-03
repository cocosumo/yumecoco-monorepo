import { phoneRegExp, postalRegExp } from 'kokoas-client/src/helpers/yupValidator';
import * as Yup from 'yup';
import { CustomerInstanceKeys, KeyOfForm } from './form';

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
    'yumeAG1': Yup
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

          'phone1': Yup.string().matches(phoneRegExp, '半角数字。例：07012641265')
            .required('必須です。'),
          'phone1Rel': Yup.string().required('連絡先の続柄を選択してください'),

          'phone2': Yup.string().matches(phoneRegExp, '半角数字。例：07012641265'),
          'phone2Rel': Yup.string()
            .when('phone2', {
              is: (val: string) => !!val,
              then: Yup.string().required('連絡先の続柄を選択してください'),
            }),

          'email': Yup.string().email('有効なメールアドレスを入力ください。例：info@cocosumo.jp'),
          'emailRel': Yup.string()
            .when('email', {
              is: (val: string) => !!val,
              then: Yup.string().required('連絡先の続柄を選択してください。'),
            }),

        } as Partial<Record<CustomerInstanceKeys, any>>),
      ),
  } as Partial<Record<KeyOfForm, any>>,
);