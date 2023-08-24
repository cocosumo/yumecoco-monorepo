
import { TForm } from './schema';



export const initialForm: TForm = {
  projDataId: '',
  custGroupId: '',
  custName: '',
  ranks: [],
  keyword: '',
  projName: '',
  contractAmtFrom: null,
  contractAmtTo: null,
};


//export type TypeOfForm =  Yup.InferType<typeof validationSchema> ;
//export type KeyOfForm = keyof TypeOfForm;