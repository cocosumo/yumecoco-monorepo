import * as Yup from 'yup';
import { validationSchema } from './validationSchema';


export type TypeOfForm =  Yup.InferType<typeof validationSchema> ;
export type KeyOfForm = keyof TypeOfForm;

export const initialValues : TypeOfForm = {
  custGroupId: '',
  customerName: '',
  projDataId: '',
  projId: '',
  projName: '',
  projTypeId: '',
  projTypeName: '',
  profitRate: 0,
};

