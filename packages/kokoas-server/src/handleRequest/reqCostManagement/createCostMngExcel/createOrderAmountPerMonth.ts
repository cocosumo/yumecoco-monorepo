import { format, lastDayOfMonth, subMonths } from 'date-fns';



export interface OrderAmountPerMonth {
  paymentDate: string
  orderAmtTgtMonth: number
}

/**
 * 月ごとの発注額合計計算要のobjを準備する
 */
export const createOrderAmountPerMonth = (
  maxPaymentDate: string,
  minPaymentDate: string,
): Record<string, OrderAmountPerMonth> => {

  // 月ごとの発注額合計計算要のobjを準備する
  const newOrderAmountPerMonth = {} as Record<string, OrderAmountPerMonth>;
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

  return newOrderAmountPerMonth;
};