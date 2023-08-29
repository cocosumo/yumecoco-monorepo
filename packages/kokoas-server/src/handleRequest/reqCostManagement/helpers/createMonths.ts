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

  let minNumberOfMonths = 6; // 最低表示月数

  console.log('maxPaymentDate', maxPaymentISODate);
  console.log('minPaymentDate', minPaymentISODate);

  const difference = differenceInMonths(parseISO(maxPaymentISODate), parseISO(minPaymentISODate));

  console.log('differenceInMonths', difference);

  if (minNumberOfMonths <= difference) { // 最低表示月数より差分が大きい場合は最低表示月数を更新
    minNumberOfMonths = difference;
  }


  const monthList = [];

  for (let i = 0; i <= minNumberOfMonths; i++) {
    const dateObject = parseISO(maxPaymentISODate);
    const newDate = new Date(dateObject);

    const parsedNewDate = format(subMonths(newDate, i), 'yyyyMM');

    monthList.push(parsedNewDate);
  }

  /*   
  if (maxPaymentDate === minPaymentDate) return [maxPaymentDate];

  const monthList = [maxPaymentDate];
  const parsedNewDate = maxPaymentDate;

  do {
    const dateObject = parseISO(parsedNewDate);
    const newDate = new Date(dateObject);

    console.log('newDate::', newDate, ', parsedNewDate::',  parsedNewDate);

    // 1か月前の日付を計算
    newDate.setMonth(newDate.getMonth() - 1);
    parsedNewDate = format(newDate, 'yyyyMM');

    monthList.push(parsedNewDate);
  } while (parsedNewDate !== minPaymentDate); */

  return monthList;
};
