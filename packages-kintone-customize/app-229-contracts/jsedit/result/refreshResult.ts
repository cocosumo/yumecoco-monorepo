import { getFormValues } from '../api/getFormValues';

export const refreshResult = () => {
  const {
    year,
    month,
    store,
  } = getFormValues();

  console.log(year, month, store);
};