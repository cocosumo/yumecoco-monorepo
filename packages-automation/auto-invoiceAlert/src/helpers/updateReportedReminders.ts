import format from 'date-fns/format';
import { InvoiceReminder } from '../../types/InvoiceReminder';
import { updateInvoiceReminder } from '../api-kintone';
import { convertReminderToKintoneUpdate } from './convertReminderToKintoneUpdate';
import { IInvoiceReminder } from '../../config';
import addWeeks from 'date-fns/addWeeks';


/**
 * kintoneのリマインダーレコードを更新します
 */
export const updateReportedReminders = async ({
  reportedReminder,
  existedReminder,
}: {
  reportedReminder: InvoiceReminder[]
  existedReminder: IInvoiceReminder[]
}) => {

  // 通知実施後のリマインダーレコード更新処理、通知日は今日、再通知日は仮に3日後を設定する
  const kintoneRecords = convertReminderToKintoneUpdate({
    invoiceReminderJson: reportedReminder,
    alertDate: format(addWeeks(new Date(), 1), 'yyyy-MM-dd'),
    lastAlertDate: format(new Date(), 'yyyy-MM-dd'),
    existedReminder: existedReminder,
  });

  await updateInvoiceReminder(kintoneRecords);
};
