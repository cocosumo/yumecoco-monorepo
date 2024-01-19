import format from 'date-fns/format';
import { PaymentReminder } from '../../types/paymentReminder';
import { updatePaymentReminder } from '../api-kintone';
import { convertReminderToKintoneUpdate } from './convertReminderToKintoneUpdate';
import { IPaymentReminder } from '../../config';
import addWeeks from 'date-fns/addWeeks';



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
    alertDate: format(addWeeks(new Date(), 1), 'yyyy-MM-dd'),
    lastAlertDate: format(new Date(), 'yyyy-MM-dd'),
    existedReminders: existedReminders,
  });

  updatePaymentReminder(kintoneRecords);
};
