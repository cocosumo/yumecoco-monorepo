import format from 'date-fns/format';
import { getAllInvoiceReminder } from './getAllInvoiceReminder';



export const getInvoiceRemindersByAlertDate = (date: Date) => {
  const dateStr = format(date, 'yyyy-MM-dd');

  console.log('dateStr', dateStr);

  return getAllInvoiceReminder({
    condition: `scheduledAlertDate = "${dateStr}" and alertState != "0"`,
  });
};
