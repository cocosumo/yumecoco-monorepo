import format from 'date-fns/format';
//import parse from 'date-fns/parse';
import parseISO from 'date-fns/parseISO';
import differenceInMonths from 'date-fns/differenceInMonths';
import subMonths from 'date-fns/subMonths';
import isValid from 'date-fns/isValid';

const normalizeDate = (isoDate: string) => {
  const date = parseISO(isoDate);
  return isValid(date) ? date : new Date();
};


export const createMonths = ({ 
  minPaymentISODate,
  maxPaymentISODate,
}: {
  minPaymentISODate: string,
  maxPaymentISODate: string,
}) => {


  const minNumberOfMonths = 6;

  const startDate = normalizeDate(minPaymentISODate);
  const endDate = normalizeDate(maxPaymentISODate);

  const difference = differenceInMonths(endDate, startDate);
  
  const numMonths = Math.max(
    minNumberOfMonths, 
    difference + 1, //　最後の月を含めるために + 1
  );

  console.log('numMonths', numMonths);
  console;
  
  return Array.from(
    { length: numMonths }, 
    (_, index) => {
      const newDate = subMonths(endDate, index);
      return format(newDate, 'yyyyMM');
    },
  );

};
