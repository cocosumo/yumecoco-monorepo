
import { TForm } from './schema';
import { getFiscalYear } from '../../../helpers/getFiscalYear';


const today = new Date();
const fiscalYear = getFiscalYear(today);


export const initialForm: TForm = {
  fiscalYear: fiscalYear,
  territory: '西',  
};