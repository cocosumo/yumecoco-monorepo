import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import addDays from 'date-fns/addDays';


/**
 * 支払予定日を設定する。未入力の場合は、作成日から10日後とする
 * @param param0 
 * @returns 
 */
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