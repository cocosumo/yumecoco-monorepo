import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import addDays from 'date-fns/addDays';



export const calcPaymentDate = ({
  expectedPaymentDate,
  createDate,
}:{
  expectedPaymentDate: string | null
  createDate: string
}) => {

  if (expectedPaymentDate) return expectedPaymentDate;

  const parseDate = parseISO(createDate);
  const newPaymentDate = addDays(parseDate, 10);

  return format(newPaymentDate, 'yyyy-MM-dd');

};