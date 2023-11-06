import format from 'date-fns/format';
import { getAllInvoiceReminder } from './getAllInvoiceReminder';


/**
 * 通知予定日が指定日以前の請求リマインダーレコードを取得します
 * @param date 上記、指定日
 * @returns 
 */
export const getInvoiceRemindersByAlertDate = (date: Date) => {
  const dateStr = format(date, 'yyyy-MM-dd');

  console.log('dateStr', dateStr);

  return getAllInvoiceReminder({
    condition: `scheduledAlertDate <= "${dateStr}" and alertState != "0"`,
  });
};
