import * as Yup from 'yup';
import { validationSchema } from './formValidation';



export const initialValues: TypeOfForm = {
  order: 'asc',
  orderBy: 'estimateDataId',
  mainSearch: '',
  contractDateFrom: null,
  contractDateTo: null,
  amountFrom: undefined,
  amountTo: undefined,
  contractCompleted: true,
  contractIncomplete: true,
  contractStepTencho: true,
  contractStepCustomer: true,
  contractStepAG: true,
  contractStepAccounting: true,
  contractStepMain: true,
};


export type TypeOfForm =  Yup.InferType<typeof validationSchema> ;
export type KeyOfForm = keyof TypeOfForm;