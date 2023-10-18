import format from 'date-fns/format';
import { InvoiceReminder } from '../../types/InvoiceReminder';
import addDays from 'date-fns/addDays';
import { updateInvoiceReminder } from '../api-kintone';
import { convertReminderToKintoneUpdate } from './convertReminderToKintoneUpdate';


/**
 * kintoneのリマインダーレコードを更新します
 */
export const updateReportedReminders = ({
  reportedReminder,
}: {
  reportedReminder: InvoiceReminder[],
}) => {

  // 通知実施後のリマインダーレコード更新処理、通知日は今日、再通知日は仮に3日後を設定する
  const kintoneRecords = convertReminderToKintoneUpdate({
    invoiceReminderJson: reportedReminder,
    alertDate: format(addDays(new Date(), 3), 'yyyy-MM-dd'),
    lastAlertDate: format(new Date(), 'yyyy-MM-dd'),
  });

  updateInvoiceReminder(kintoneRecords);
};
