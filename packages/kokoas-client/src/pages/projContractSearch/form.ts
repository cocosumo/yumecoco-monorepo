import * as Yup from 'yup';
import { validationSchema } from './formValidation';



export const initialValues: TypeOfForm = {
  mainSearch: '',
  contractDateFrom: null,
  contractDateTo: null,
  amountFrom: 0,
  amountTo: 0,
};


export type TypeOfForm =  Yup.InferType<typeof validationSchema> ;
export type KeyOfForm = keyof TypeOfForm;
