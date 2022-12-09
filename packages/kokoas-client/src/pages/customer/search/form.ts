import { RecordStatus, Territory } from 'types';

export const customerTypes = [  '全て',  '個人',  '法人' ] as const;


export type CustomerTypeVals = typeof customerTypes[number];
//export type RecordStatus = typeof recordStatuses[number];
export type FormFieldKeys = keyof typeof initialValues;

/**
 * Set Initial values here in case MUI is shouting about un/controlled components.
 */
export const initialValues = {
  custType: '全て' as CustomerTypeVals,
  storeId: [] as string[],
  cocoAG: '',
  yumeAG: '',
  territory: '' as Territory,
  cocoConst: '',
  recordStatus: ['契約済/工事進行中', '情報登録のみ', '追客中'] as RecordStatus[],
  custName: '',
  contactNum: '',
  email: '',
  address: '',

};

export const getFormField = (k: FormFieldKeys ) => k;

export type TypeOfForm = typeof initialValues;

