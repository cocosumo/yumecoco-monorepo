import { TForm } from './schema';

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;

export const initialForm: TForm = {
  year: year,
  month: month,
};