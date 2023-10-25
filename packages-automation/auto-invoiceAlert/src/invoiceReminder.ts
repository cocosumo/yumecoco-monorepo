import { createInvoiceAlert } from './createInvoiceAlert';
import { updateReportedReminders } from './helpers/updateReportedReminders';
import { notifyInvoiceAlertToChatwork } from './notifyInvoiceAlertToChatwork';


/**
 * 請求書発行アラートを通知します
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