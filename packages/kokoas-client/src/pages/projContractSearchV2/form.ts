
import { TForm } from './schema';



export const initialValues: TForm = {
  order: 'desc',
  orderBy: '',
  custName: '',
  
  mainSearch: '',
  contractDateFrom: null,
  contractDateTo: null,
  amountFrom: null,
  amountTo: null,
  contractCompleted: false,
  contractIncomplete: false,
  projTypes: [],
  stores: [],
};


//export type TypeOfForm =  Yup.InferType<typeof validationSchema> ;
//export type KeyOfForm = keyof TypeOfForm;