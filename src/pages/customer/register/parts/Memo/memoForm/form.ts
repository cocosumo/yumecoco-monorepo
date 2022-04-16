import * as Yup from 'yup';

export const initialValues = {
  recordId: '',
  memoType: '',
  contents: '',
  notifyTo: '',
};

export type MemoFormType = typeof initialValues;
export type MemoFormKeys = keyof MemoFormType;

export const validationSchema =  Yup.object().shape(
  {
    'store' : Yup
      .string(),
      
    'cocoAG1' : Yup
      .string(),
    
  },
);

export const getFieldName = <T extends MemoFormKeys>(fn : T) : T => fn;