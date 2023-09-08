import subMonths from 'date-fns/subMonths';
import format from 'date-fns/format';
import { TForm } from './schema';
import { getFiscalYear } from '../../../helpers/getFiscalYear';
import { getFiscalMonths } from '../../../helpers/getFiscalMonths';


const today = new Date(2023, 0, 1);
const fiscalYear = getFiscalYear(today);


const getLatestMonths = (maxMonths: number) => {
  const fiscalMonths = getFiscalMonths(fiscalYear);

  const months: string[] = [];

  for (let i = 0; i < maxMonths; i++) {
    const date = subMonths(today, i);
    const formattedDate = format(date, 'yyyy-MM');
    
    if (fiscalMonths.includes(formattedDate)) {
      months.push(formattedDate);
    }
  }
  return months.reverse();

};


export const initialForm: TForm = {
  months: getLatestMonths(3),
  year: fiscalYear.toString(),
  stores: [],
};