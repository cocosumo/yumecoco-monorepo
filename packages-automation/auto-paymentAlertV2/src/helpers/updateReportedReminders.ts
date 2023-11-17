import format from 'date-fns/format';
import { PaymentReminder } from '../../types/paymentReminder';
import addDays from 'date-fns/addDays';
import { updatePaymentReminder } from '../api-kintone';
import { convertReminderToKintoneUpdate } from './convertReminderToKintoneUpdate';
import { IPaymentReminder } from '../../config';



export const updateReportedReminders = ({
  reportedReminders,
  existedReminders,
}: {
  reportedReminders: PaymentReminder[]
  existedReminders: IPaymentReminder[]
}) => {

  // 通知実施後のリマインダーレコード更新処理、通知日は今日、再通知日は仮に3日後を設定する
  const kintoneRecords = convertReminderToKintoneUpdate({
    paymentReminderJson: reportedReminders,
    alertDate: format(addDays(new Date(), 3), 'yyyy-MM-dd'),
    lastAlertDate: format(new Date(), 'yyyy-MM-dd'),
    existedReminder: existedReminders,
  });

  updatePaymentReminder(kintoneRecords);
};
