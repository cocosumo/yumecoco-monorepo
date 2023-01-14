import { TAgents } from 'types';
import * as Yup from 'yup';
import { MemoType } from './MemoForm';

export const initialValues = {
  custGroupId: '',
  custName: '',
  memoId: '',
  memoType: '' as MemoType,
  contents: '',
  notifyTo: [] as TAgents[],
  isNotify: false,
  updateTime: '',
  commenter: '',
  createDate: '',
};

export type MemoFormType = typeof initialValues;
export type MemoFormKeys = keyof MemoFormType;

export const validationSchema =  Yup.object().shape(
  {
    'memoType' : Yup
      .string()
      .required('必須です。'),

    'contents' : Yup
      .string()
      .required('必須です。'),
    'notifyTo': Yup.array().when('isNotify', {
      is: true,
      then: Yup.array().min(1, '「担当者を通知する」に☑を入れましたが、担当者が選択されていません。'),
    }),

  } as Partial<Record<MemoFormKeys, any>>,
);

export const getFieldName = <T extends MemoFormKeys>(fn : T) : T => fn;