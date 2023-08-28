import format from 'date-fns/format';
import parse from 'date-fns/parse';

export const createMonths = (maxPaymentDate: string, minPaymentDate: string) => {
  console.log('maxPaymentDate', maxPaymentDate);
  console.log('minPaymentDate', minPaymentDate);

  if (maxPaymentDate === minPaymentDate) return [maxPaymentDate];

  const monthList = [maxPaymentDate];
  let parsedNewDate = maxPaymentDate;


  do {
    const dateObject = parse(parsedNewDate, 'yyyyMM', new Date());
    const newDate = new Date(dateObject);

    console.log('newDate::', newDate, ', parsedNewDate::',  parsedNewDate);

    // 1か月前の日付を計算
    newDate.setMonth(newDate.getMonth() - 1);
    parsedNewDate = format(newDate, 'yyyyMM');

    monthList.push(parsedNewDate);
  } while (parsedNewDate !== minPaymentDate);

  return (monthList);
};
