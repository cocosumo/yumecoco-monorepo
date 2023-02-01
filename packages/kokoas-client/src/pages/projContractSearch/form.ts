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

    case 'amountFrom': return `契約金額：${(+value as number).toLocaleString()} 円以上`;
    case 'amountTo': return `契約金額：${(+value as number).toLocaleString()} 円以下`;

    case 'contractDateFrom': return transformToLabel(value, 'から');
    case 'contractDateTo': return transformToLabel(value, 'まで');
    default: return String(value);
  }
};