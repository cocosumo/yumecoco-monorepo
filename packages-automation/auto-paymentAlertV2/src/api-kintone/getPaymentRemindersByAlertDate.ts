import format from 'date-fns/format';
import { getAllPaymentReminder } from './getAllPaymentReminder';


/**
 * 通知予定日が指定日以前の請求リマインダーレコードを取得します
 * @param date 上記、指定日
 * @returns 
 */
export const getPaymentRemindersByAlertDate = (date: Date) => {
  const dateStr = format(date, 'yyyy-MM-dd');

  console.log('dateStr', dateStr);

  return getAllPaymentReminder({
    condition: `scheduledAlertDate <= "${dateStr}" and alertState != "0"`,
  });
};
