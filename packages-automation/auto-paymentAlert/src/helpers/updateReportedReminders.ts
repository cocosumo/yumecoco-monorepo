import format from 'date-fns/format';
import { PaymentReminder } from '../../types/paymentReminder';
import addDays from 'date-fns/addDays';
import { updatePaymentReminder } from '../api-kintone';
import { convertReminderToKintoneUpdate } from './convertReminderToKintoneUpdate';



export const updateReportedReminders = ({
  reportedReminder,
}:{  
  reportedReminder: PaymentReminder[],
}) => {

  const kintoneRecords = convertReminderToKintoneUpdate({
    paymentReminderJson: reportedReminder,
    alertDate: format(addDays(new Date(), 3), 'yyyy-MM-dd'),
    lastAlertDate: format(new Date(), 'yyyy-MM-dd'),
  });
  
  updatePaymentReminder(kintoneRecords);
};