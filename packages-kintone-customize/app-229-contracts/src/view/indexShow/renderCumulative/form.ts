import { TForm } from './schema';
import { format, subMonths } from 'date-fns';

const today = new Date();


const getLatestMonths = (maxMonths: number) => {

  return Array.from({ length: maxMonths }, (_, i) => {
    const date = subMonths(today, i);
    return format(date, 'yyyy-MM');
  });
};


export const initialForm: TForm = {
  months: getLatestMonths(3),
  year: format(today, 'yyyy'),
};