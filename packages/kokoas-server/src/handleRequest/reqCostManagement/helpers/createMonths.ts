import format from 'date-fns/format';
//import parse from 'date-fns/parse';
import parseISO from 'date-fns/parseISO';
import differenceInMonths from 'date-fns/differenceInMonths';
import subMonths from 'date-fns/subMonths';

export const createMonths = ({ 
  minPaymentISODate,
  maxPaymentISODate,
}: {
  minPaymentISODate: string,
  maxPaymentISODate: string,
}) => {

  const minNumberOfMonths = 6;

  const startDate = parseISO(maxPaymentISODate);
  const endDate = parseISO(minPaymentISODate);
  
  const difference = differenceInMonths(startDate, endDate);
  const numMonths = Math.max(minNumberOfMonths, difference + 1);
  
  const monthList = Array.from(
    { length: numMonths }, 
    (_, index) => {
      const newDate = subMonths(startDate, index);
      return format(newDate, 'yyyyMM');
    },
  );

  return monthList;

};
