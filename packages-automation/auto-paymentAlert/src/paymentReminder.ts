import { createPaymentAlert } from './createPaymentAlert';
import { updateReportedReminders } from './helpers/updateReportedReminders';
import { notifyPaymentAlertToChatwork } from './notifyPaymentAlertToChatwork';


/**
 * 入金アラートを通知します
 */
export const paymentReminder = async () => {
  console.log('start payment reminder');

  const alertReminderJson = await createPaymentAlert();

  // chatworkへの通知処理
  notifyPaymentAlertToChatwork({
    reminderJson: alertReminderJson,
  });

  // リマインダーレコードの更新処理
  updateReportedReminders({
    reportedReminder: alertReminderJson,
  });

};
