import { createPaymentAlert } from './createPaymentAlert';
import { updateReportedReminders } from './helpers/updateReportedReminders';
import { notifyPaymentAlertToChatwork } from './notifyPaymentAlertToChatwork';


/**
 * 入金アラートを通知します
 */
export const invoiceReminder = async () => {
  console.log('start invoice reminder');

  const reminderJson = await createPaymentAlert();

  // chatworkへの通知処理
  notifyPaymentAlertToChatwork({
    reminderJson: reminderJson,
  });

  // リマインダーレコードの更新処理
  updateReportedReminders({
    reportedReminder: reminderJson,
  });

};
