import { today } from './config';
import { TForm } from './schema';

const year = today.getFullYear();
const month = today.getMonth() + 1;

export const initialForm: TForm = {
  year: year,
  month: month,
};