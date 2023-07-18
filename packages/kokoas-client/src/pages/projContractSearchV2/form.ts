
import { TForm } from './schema';



export const initialValues: TForm = {
  order: 'asc',
  orderBy: 'contractDate',
  custName: '',
  
  mainSearch: '',
  contractDateFrom: null,
  contractDateTo: null,
  amountFrom: null,
  amountTo: null,
  contractCompleted: false,
  contractIncomplete: false,
  contractStepTencho: false,
  contractStepCustomer: false,
  contractStepAG: false,
  contractStepAccounting: false,
  contractStepMain: false,
  projTypes: [],
  stores: [],
};


//export type TypeOfForm =  Yup.InferType<typeof validationSchema> ;
//export type KeyOfForm = keyof TypeOfForm;