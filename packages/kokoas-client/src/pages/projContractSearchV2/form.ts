import * as Yup from 'yup';
import { validationSchema } from './formValidation';



export const initialValues: TypeOfForm = {
  order: 'desc',
  orderBy: 'contractDate',
  mainSearch: '',
  contractDateFrom: null,
  contractDateTo: null,
  amountFrom: undefined,
  amountTo: undefined,
  contractCompleted: false,
  contractIncomplete: false,
  contractStepTencho: false,
  contractStepCustomer: false,
  contractStepAG: false,
  contractStepAccounting: false,
  contractStepMain: false,
};


export type TypeOfForm =  Yup.InferType<typeof validationSchema> ;
export type KeyOfForm = keyof TypeOfForm;