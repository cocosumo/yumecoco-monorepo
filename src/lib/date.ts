import { format } from 'date-fns';

export const isTypeOfDate = (
  dirtyDate: object | string,
) => dirtyDate instanceof Date;

/**
 * Reference.
 * Kintone converts time to UTC, so specify timezone during conversion.
 *
 * https://developer.cybozu.io/hc/ja/articles/201941754-kintone-REST-API%E3%81%AE%E5%85%B1%E9%80%9A%E4%BB%95%E6%A7%98
 * @param rawDate
 * @returnss Formatted date str
 */
export const toKintoneDateStr = (rawDate: object | Date | string, withTime = false ) => {
  if (isTypeOfDate(rawDate)) {
    return format(
      rawDate as Date, `yyyy-MM-dd${withTime ? "'T'HH:mm:ss+09:00" : ''}`);
  } else {
    return '';
  }
};