import { DateTime } from 'luxon';

export const ISOtoLux = (dateISO: string) => DateTime.fromISO(dateISO);

export const JSDToLux = (date: Date) => DateTime.fromJSDate(date);

export const toLocaleDate = (dateISO: string) => ISOtoLux(dateISO).toLocaleString(DateTime.DATE_MED);

export const stringToLux = (dateStr: string) => DateTime.fromFormat(dateStr, 'yyyy-MM-dd');

export const isWithinMonth = (currMonth: DateTime | null, luxDate: DateTime) => {
  if (!luxDate || !currMonth) return false;
  const startDay = currMonth.startOf('month');
  const endDay = currMonth.endOf('month');

  return luxDate >= startDay && luxDate <= endDay;
};

export const isMonthNow = (luxDate: DateTime) => isWithinMonth(DateTime.now(), luxDate);
