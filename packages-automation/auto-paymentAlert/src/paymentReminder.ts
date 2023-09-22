import { createPaymentAlert } from './createPaymentAlert';
import { updateReportedReminders } from './helpers/updateReportedReminders';
import { notifyPaymentAlertToChatwork } from './notifyPaymentAlertToChatwork';


/**
 * 入金アラートを通知します
 */
export const paymentReminder = async () => {
  console.log('start payment reminder');

  const reminderJson = await createPaymentAlert();

  notifyPaymentAlertToChatwork({
    reminderJson: reminderJson,
  });

  updateReportedReminders({
    reportedReminder: reminderJson,
  });

};
