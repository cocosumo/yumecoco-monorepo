
import * as Yup from 'yup';

export const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const postalRegExp = /^\d{7,8}$/;

export const dateValidation =  Yup
  .date()
  .typeError('無効な日付です');