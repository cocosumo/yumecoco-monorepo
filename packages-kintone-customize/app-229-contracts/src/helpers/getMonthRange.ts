import format from 'date-fns/format';

export const getMonthRange = (
  year: number,
  month: number,
) => {

  const minDateStr = format(new Date(+year, +month - 1, 1), 'yyyy-MM-dd');
  const maxDateteStr = format(new Date(+year, +month, 0), 'yyyy-MM-dd');

  return {
    minDateStr,
    maxDateteStr,
  };

};