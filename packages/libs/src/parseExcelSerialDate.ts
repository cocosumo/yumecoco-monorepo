
import addMinutes from 'date-fns/addMinutes';
import subMinutes from 'date-fns/subMinutes';


/**
 * Excelの日付をISO(UTC)に変換します。
 * 日付はGMT+9を想定していますが、必要に応じて、当関数を改善します。~ ras
 */
export const parseExcelSerialDate = (serial: number) => {

  const rawDate = new Date((serial - 25569) * 86400 * 1000);

  const offset = 540; // GMT+9

  const utcDate =  Math.sign(offset) !== -1 ? addMinutes(rawDate, offset) : subMinutes(rawDate, Math.abs(offset));

  return utcDate.toISOString();
};