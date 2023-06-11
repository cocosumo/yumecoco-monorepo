import { format, parseISO } from 'date-fns';

export const isTypeOfDate = (
  dirtyDate: object | string | null,
) => dirtyDate instanceof Date;

/**
 * Kintone converts time to UTC, so specify timezone during conversion.
 *
 * Reference.
 * https://developer.cybozu.io/hc/ja/articles/201941754-kintone-REST-API%E3%81%AE%E5%85%B1%E9%80%9A%E4%BB%95%E6%A7%98
 * @param {object | Date | string} rawDate
 * @param {boolean} withTime whether to include time in the conversion or not.
 * @returns Formatted date str
 * @todo String parsable to date is not handled here, update when needed.
 */
export const toKintoneDateStr = (rawDate: object | Date | string | null, withTime = false ) => {
  if (isTypeOfDate(rawDate)) {
    return format(
      rawDate as Date, `yyyy-MM-dd${withTime ? "'T'HH:mm:ss+09:00" : ''}`,
    );
  } else {
    return '';
  }
};

/**
 * Convert kintone date to JSDate .
 * Kintone date could be undefined so convert it to empty string.
 * Converting to empty string keep MUI date fields controlled.
 * https://mui.com/material-ui/react-text-field/#uncontrolled-vs-controlled
 *
 * @todo Might need improvement to make it more declarative.
 *
 * @param kintoneDate
 * @returns {Date | ""} Javascript date object.
 */
export const parseKintoneDate = <T = unknown>(
  kintoneDate: string | undefined | null,
  emptyVal: T = '' as T,
): Date | T => kintoneDate ? parseISO(kintoneDate) : emptyVal;

export const parseISOTimeToFormat = (
  isoDate: string | null | undefined,
  formatStr = 'yyyy/MM/dd HH:mm',
) => {
  if (!isoDate) return '';
  return format(parseISO(isoDate), formatStr);
};