import format from 'date-fns/format';
import parse from 'date-fns/parse';

export const formatYearMonth = (yearMonth: string) => {

  return `${format(parse(yearMonth, 'yyyy-MM', new Date()), 'M')}月`;
};