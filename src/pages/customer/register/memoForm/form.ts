import * as Yup from 'yup';

export const initialValues = {
  recordId: '',
  memoType: '',
  contents: '',
  notifyTo: '',
};

export type MemoForm = typeof initialValues;
export type MemoFormKeys = keyof MemoForm;

export const validationSchema =  Yup.object().shape(
  {
    'store' : Yup
      .string()
      .required('必須です。'),
    'cocoAG1' : Yup
      .string()
      .required('必須です。'),
  },
);