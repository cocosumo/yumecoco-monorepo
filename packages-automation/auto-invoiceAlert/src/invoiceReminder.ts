import { createInvoiceAlert } from './createInvoiceAlert';
import { updateReportedReminders } from './helpers/updateReportedReminders';
import { notifyInvoiceAlertToChatwork } from './notifyInvoiceAlertToChatwork';


/**
 * 入金アラートを通知します
 */
export const invoiceReminder = async () => {
  console.log('start invoice reminder');

  const reminderJson = await createInvoiceAlert();

  // chatworkへの通知処理
  notifyInvoiceAlertToChatwork({
    reminderJson: reminderJson,
  });

  // リマインダーレコードの更新処理
  updateReportedReminders({
    reportedReminder: reminderJson,
  });

};
