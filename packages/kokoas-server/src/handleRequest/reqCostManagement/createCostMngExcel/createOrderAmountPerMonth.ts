import lastDayOfMonth from 'date-fns/lastDayOfMonth';
import format from 'date-fns/format';
import parse from 'date-fns/parse';



export interface OrderAmountPerMonth {
  paymentDate: string
  orderAmtTgtMonth: number
}

/**
 * 月ごとの発注額合計計算要のobjを準備する
 */
export const createOrderAmountPerMonth = (
  months: string[],
) => {

  const newOrderAmountPerMonth: Record<string, OrderAmountPerMonth> = {};

  for (const month of months) {
    const formatedMonth = month === 'unknown' 
      ? '未定' 
      : format(
        lastDayOfMonth(
          parse(month, 'yyyyMM', new Date()),
        ), 
        'yyyy.MM.dd',
      );

    newOrderAmountPerMonth[formatedMonth] = {
      paymentDate: formatedMonth,
      orderAmtTgtMonth: 0,
    };
  }

  /* 
  // 月ごとの発注額合計計算要のobjを準備する
  const isoMaxDate = new Date(maxPaymentDate);
  const maxDateFormat = format(lastDayOfMonth(isoMaxDate), 'yyyy.MM.dd');
  const isoMinDate = new Date(minPaymentDate);
  const minDateFormat = format(lastDayOfMonth(isoMinDate), 'yyyy.MM.dd');

  newOrderAmountPerMonth[maxDateFormat] = {
    paymentDate: maxDateFormat,
    orderAmtTgtMonth: 0,
  };
  if (maxDateFormat === minDateFormat) return newOrderAmountPerMonth;

  let monthIdx = 1;
  let newDateFormat = '';
  do {
    newDateFormat = format(lastDayOfMonth(subMonths(isoMaxDate, monthIdx++)), 'yyyy.MM.dd');
    newOrderAmountPerMonth[newDateFormat] = {
      paymentDate: newDateFormat,
      orderAmtTgtMonth: 0,
    };
  } while (newDateFormat !== minDateFormat);
 */
  return newOrderAmountPerMonth;
};