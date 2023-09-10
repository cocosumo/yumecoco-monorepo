
import { TForm } from './schema';
import { getFiscalYear } from '../../../helpers/getFiscalYear';
import { getLatestMonths } from '../../../helpers/getLatestMonths';


const today = new Date();
const fiscalYear = getFiscalYear(today);


export const initialForm: TForm = {
  months: getLatestMonths(fiscalYear, 3),
  year: fiscalYear.toString(),
  stores: '',
};