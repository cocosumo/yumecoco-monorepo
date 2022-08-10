
import * as Yup from 'yup';

export const initialValues = {
  projId: '',
  costomerName: '',
  tax: 10,
};

export type TypeOfForm =  typeof initialValues;
export type KeyOfForm = keyof TypeOfForm;

export const getFieldName = (s: KeyOfForm) => s;

export const validationSchema =  Yup.object(
  {
    'projId': Yup
      .string()
      .required('必須です。'),
    'tax': Yup
      .number()
      .required('必須です。'),
  } as Partial<Record<KeyOfForm, any>>,
);