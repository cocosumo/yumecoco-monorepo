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

  // 最低6ヶ月分のデータを生成する
  const minNumberOfMonths = 6;

  // Date型に変換
  // 空の場合は現在の日付を設定
  const startDate = maxPaymentISODate ? parseISO(maxPaymentISODate) : new Date();
  const endDate = minPaymentISODate ? parseISO(minPaymentISODate) : new Date();
  
  // 月の差分を取得
  const difference = differenceInMonths(startDate, endDate);

  // 月の差分が最低6ヶ月分より小さい場合は、最低6ヶ月分のデータを生成する
  const numMonths = Math.max(
    minNumberOfMonths, 
    difference + 1, //　最後の月を含めるために + 1
  );
  
  // 月のリストを生成
  return Array.from(
    { length: numMonths }, 
    (_, index) => {
      const newDate = subMonths(startDate, index);
      return format(newDate, 'yyyyMM');
    },
  );

};
