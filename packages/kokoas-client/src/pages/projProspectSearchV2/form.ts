
import { TForm } from './schema';



export const initialForm: TForm = {
  custName: '',
  ranks: [],
  keyword: '',
  projName: '',
  contractAmtFrom: null,
  contractAmtTo: null,
  contractDateFrom: null,
  contractDateTo: null,
};


//export type TypeOfForm =  Yup.InferType<typeof validationSchema> ;
//export type KeyOfForm = keyof TypeOfForm;