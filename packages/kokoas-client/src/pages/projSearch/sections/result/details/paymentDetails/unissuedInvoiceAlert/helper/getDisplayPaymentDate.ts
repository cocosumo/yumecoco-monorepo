import format from 'date-fns/format';
import isValid from 'date-fns/isValid';


export const getDisplayPaymentDate = (paymentDate: Date | null) => {
  
  if (!paymentDate) return '';
  return isValid(paymentDate) ? format(new Date(paymentDate), 'yyyy年M月d日') : '';

};
