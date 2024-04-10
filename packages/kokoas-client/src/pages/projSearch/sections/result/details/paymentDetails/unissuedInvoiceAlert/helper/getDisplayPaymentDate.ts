import format from 'date-fns/format';
import isValid from 'date-fns/isValid';


export const getDisplayPaymentDate = (
  paymentDate: Date | null,
  dateFormat = 'yyyy年M月d日',
) : string => {

  if (!paymentDate) return '';
  return isValid(paymentDate) ? format(paymentDate, dateFormat) : '';

};
