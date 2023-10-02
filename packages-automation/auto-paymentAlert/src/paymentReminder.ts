import { getAllAndpadPayments } from 'api-kintone';
import { getPaymentRemindersByAlertDate } from './api-kintone';
import { createPaymentAlert } from './createPaymentAlert';
import { convertReminderToJson } from './helpers/convertReminderToJson';
import { updateReportedReminders } from './helpers/updateReportedReminders';
import { notifyPaymentAlertToChatwork } from './notifyPaymentAlertToChatwork';


/**
 * 入金アラートを通知します
 */
export const paymentReminder = async () => {
  console.log('start payment reminder');

  await createPaymentAlert();

  const [
    alertReminder,
    allAndpadPayments,
  ] = await Promise.all([
    getPaymentRemindersByAlertDate(new Date()),    
    getAllAndpadPayments(),
  ]);

  // リマインダーアプリから通知対象を取得する
  const alertReminderJson = convertReminderToJson({
    reminder: alertReminder,
    andpadPayments: allAndpadPayments,
  });

  // chatworkへの通知処理
  notifyPaymentAlertToChatwork({
    reminderJson: alertReminderJson,
  });

  // リマインダーレコードの更新処理
  updateReportedReminders({
    reportedReminder: alertReminderJson,
  });

};
