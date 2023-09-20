import format from 'date-fns/format';
import { getAllPaymentReminder } from './getAllPaymentReminder';



export const getPaymentRemindersByAlertDate = (date: Date) => {
  const dateStr = format(date, 'yyyy-MM-dd');

  console.log('dateStr', dateStr);

  return getAllPaymentReminder({
    condition: `alertDate = "${dateStr}"`,
  });
};
