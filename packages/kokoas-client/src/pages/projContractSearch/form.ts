import isValid from 'date-fns/isValid';
import parseISO from 'date-fns/parseISO';
import  format from 'date-fns/format';
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

const transformToLabel = <T = unknown>(value: T, suffix: 'から' | 'まで') => {

  if (typeof value !== 'string') return;

  const dateObj = parseISO(value as string);

  if (isValid(dateObj)) {
    return `契約日：${format(dateObj, 'yyyy-MM-dd')} ${suffix}`;
  }
};

export const parseValue = <T extends KeyOfForm>(
  name: T, value: TypeOfForm[T],
) => {
  if (!value) return;

  switch (name) {

    case 'amountFrom': return `最小金額：${(+value as number).toLocaleString()} 円`;
    case 'amountTo': return `最大金額：${(+value as number).toLocaleString()} 円`;

    case 'contractDateFrom': return transformToLabel(value, 'から');
    case 'contractDateTo': return transformToLabel(value, 'まで');
    default: return String(value);
  }
};