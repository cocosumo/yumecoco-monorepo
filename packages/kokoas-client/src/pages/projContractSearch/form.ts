import  format from 'date-fns/format';
import  parseISO from 'date-fns/parseISO';
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


export const fieldNameToJa = (name: KeyOfForm) => {
  switch (name) {
    case 'amountFrom': return '最小金額';
    case 'amountTo': return '最大金額';
    case 'contractDateFrom': return '契約日「から」';
    case 'contractDateTo': return '契約日「まで」';
    default: return name;
  }
};

export const parseValue = <T extends KeyOfForm>(name: T, value: TypeOfForm[T]) => {
  switch (name) {

    case 'amountFrom':
    case 'amountTo': return `${(value as number).toLocaleString()} 円`;

    case 'contractDateFrom':
    case 'contractDateTo': return format(parseISO(value as string), 'yyyy-MM-dd');

    default: return value;
  }
};