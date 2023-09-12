import moment from 'moment';

export const  getFirstAndLastDay = (
  year: number, 
  month: number,
) => {
  // Create a Date object for the first day of the month
  const firstDay = moment({ year, month: month - 1, day: 1 });
  const lastDay = moment({ year, month: month - 1 }).endOf('month');

  return {
    firstDay: firstDay.format('YYYY-MM-DD'),
    lastDay: lastDay.format('YYYY-MM-DD'),
  };
};