import format from 'date-fns/format';

/**
 * 月の範囲を取得する
 * 
 * @param year 年
 * @param month 月 
 * @returns { minDateStr: string, maxDateteStr: string }
 */
export const getMonthRange = (
  year: number,
  month: number,
) => {

  const minDateStr = format(new Date(+year, +month - 1, 1), 'yyyy-MM-dd');
  const maxDateStr = format(new Date(+year, +month, 0), 'yyyy-MM-dd');

  return {
    minDateStr,
    maxDateStr,
  };

};