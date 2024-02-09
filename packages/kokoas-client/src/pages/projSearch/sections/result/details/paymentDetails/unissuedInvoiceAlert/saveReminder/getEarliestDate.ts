import format from 'date-fns/format';



const parseDateString = (dateString: string) => {
  if (dateString === '') {
    return null;
  }

  const parts = dateString.split('-');
  if (parts.length === 3) {
    const year = +parts[0];
    const month = +parts[1] - 1;
    const day = +parts[2];
    return new Date(year, month, day);
  }

  return null;
};



export const getEarliestDate = (dates: string[]) => {
  if (dates.length === 0) {
    return '';
  }

  let earliestDate = parseDateString(dates[0]);

  for (const date of dates) {
    const currentDate = parseDateString(date);
    if (currentDate && (earliestDate === null || currentDate < earliestDate)) {
      earliestDate = currentDate;
    }
  }

  return earliestDate ? format(earliestDate, 'yyyy-MM-dd') : '';
};
