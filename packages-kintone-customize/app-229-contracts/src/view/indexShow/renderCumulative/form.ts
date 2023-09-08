import subMonths from 'date-fns/subMonths';
import format from 'date-fns/format';
import { TForm } from './schema';
import { getFiscalYear } from '../../../helpers/getFiscalYear';
import { getFiscalMonths } from '../../../helpers/getFiscalMonths';


const today = new Date(2022, 11, 1);

const getLatestMonths = (maxMonths: number) => {
  const fiscalYear = getFiscalYear(today);
  const fiscalMonths = getFiscalMonths(fiscalYear);

  console.log('fiscal', fiscalYear, fiscalMonths );

  const months = [];

  for (let i = 0; i < maxMonths; i++) {
    const date = subMonths(today, i);
    const formattedDate = format(date, 'yyyy-MM');
    
    if (fiscalMonths.includes(formattedDate)) {
      months.push(formattedDate);
    }
  }
  return months;

};


export const initialForm: TForm = {
  months: getLatestMonths(3),
  year: format(today, 'yyyy'),
  stores: [],
};