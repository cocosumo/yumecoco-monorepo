import * as Yup from 'yup';
import { AgentTypes } from '../../../../../../types/forms';

export const initialValues = {
  recordId: '',
  memoType: '',
  contents: '',
  notifyTo: [] as AgentTypes[],
  isNotify: false,
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