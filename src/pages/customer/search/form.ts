//import * as Yup from 'yup';
import { RecordStatus } from '../../../config/formValues';
//import { recordStatuses } from '../../../config/formValues';

export const customerTypes = [  '全て',  '個人',  '法人' ] as const;


export type CustomerTypeVals = typeof customerTypes[number];
//export type RecordStatus = typeof recordStatuses[number];
export type FormFieldKeys = keyof typeof initialValues;

/**
 * Set Initial values here in case MUI is shouting about un/controlled components.
 */
export const initialValues = {
  custType: '全て' as CustomerTypeVals,
  storeId: '',
  cocoAG: '',
  yumeAG: '',
  cocoConst: '',
  recordStatus: [] as RecordStatus[],
  custName: '',
  contactNum: '',
  email: '',
  address: '',
};

/**
 * Set Validation for fields that requires it.
 * Refer to YUM documentation.
 */
/* export const validationSchema =  Yup.object(
  {
    custGroupId: Yup
      .string()
      .required('必須です。'),

  },
);
 */