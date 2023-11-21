import { getAllAndpadPayments, getAllContracts, getAllProjects, getAllStores, getEmployees } from 'api-kintone';
import { getAllPaymentReminder, getPaymentRemindersByAlertDate } from './api-kintone';
import { convertRemindersToJson } from './helpers/convertRemindersToJson';
import { updateReportedReminders } from './helpers/updateReportedReminders';
import { notifyPaymentAlertToChatwork } from './notifyPaymentAlertToChatwork';
import { getUnpaidAndpadPayments } from 'api-kintone/src/andpadPayments/getUnpaidAndpadPayments';
import { createPaymentAlertFromAPPayments } from './createPaymentAlertFromAPPayments';
import { registerReminders } from './helpers/registerReminders';


/**
 * 入金アラートを通知します
 */
export const paymentReminder = async () => {
  console.log('start payment reminder');

  const [
    allProjects,
    unpaidAndpadPayments,
    allAndpadPayments,
    allMembers,
    allStores,
    allContracts,
    allPaymentReminders,
  ] = await Promise.all([
    getAllProjects(),
    getUnpaidAndpadPayments(),
    getAllAndpadPayments(),
    getEmployees(),
    getAllStores(),
    getAllContracts(),
    getAllPaymentReminder(),
  ]);

  
  // ANDPAD入金一覧の内容からアラート対象を取得する
  const alertPaymentsJson = createPaymentAlertFromAPPayments({
    unpaidAndpadPayments: unpaidAndpadPayments,
    contracts: allContracts,
    reminders: allPaymentReminders,
    projects: allProjects,
    employees: allMembers,
    stores: allStores,
  });

  // アラートレコードをリマインダーアプリへ登録する
  await registerReminders({
    reminderJson: alertPaymentsJson,
  });

  // 今日以前が通知日のリマインダーレコードを取得する
  const alertReminders = await getPaymentRemindersByAlertDate(new Date());

  const alertRemindersJson = convertRemindersToJson({
    reminders: alertReminders,
    andpadPayments: allAndpadPayments,
    allProjects: allProjects,
    contracts: allContracts,
    employees: allMembers,
    stores: allStores,
  });


  // chatworkへの通知処理
  await notifyPaymentAlertToChatwork({
    reminderJson: alertRemindersJson,
  });

  // リマインダーレコードの更新処理
  updateReportedReminders({
    reportedReminders: alertRemindersJson,
    existedReminders: alertReminders,
  });

  console.log('finish payment reminder');
};
