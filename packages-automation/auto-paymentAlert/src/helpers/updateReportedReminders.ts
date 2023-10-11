import format from 'date-fns/format';
import { PaymentReminder } from '../../types/paymentReminder';
import addDays from 'date-fns/addDays';
import { updatePaymentReminder } from '../api-kintone';
import { convertReminderToKintoneUpdate } from './convertReminderToKintoneUpdate';



export const updateReportedReminders = ({
  reportedReminder,
}: {
  reportedReminder: PaymentReminder[],
}) => {

  // 通知実施後のリマインダーレコード更新処理、通知日は今日、再通知日は仮に3日後を設定する
  const kintoneRecords = convertReminderToKintoneUpdate({
    paymentReminderJson: reportedReminder,
    alertDate: format(addDays(new Date(), 3), 'yyyy-MM-dd'),
    lastAlertDate: format(new Date(), 'yyyy-MM-dd'),
  });

  updatePaymentReminder(kintoneRecords);
};
