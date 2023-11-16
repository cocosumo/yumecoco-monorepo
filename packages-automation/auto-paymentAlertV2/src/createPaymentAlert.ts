import { getAllProjects, getAllAndpadPayments, getAllStores, getEmployees, getAllContracts } from 'api-kintone';
import { getMyOrders } from 'api-andpad';
import { registerReminders } from './helpers/registerReminders';
import { getAllPaymentReminder, getPaymentRemindersByAlertDate } from './api-kintone';
import { createPaymentAlertFromAPPayments } from './createPaymentAlertFromAPPayments';
import { convertReminderToJson } from './helpers/convertReminderToJson';
import { getUnpaidAndpadPayments } from 'api-kintone/src/andpadPayments/getUnpaidAndpadPayments';



/**
 * 通知対象の入金レコード情報をまとめます
 */
export const createPaymentAlert = async () => {
  console.log('start create payment reminder ver2');

  const [
    allProjects,
    unpaidAndpadPayments,
    allAndpadPayments,
    allMembers,
    allStores,
    allOrders,
    tgtProjTypeContracts,
    allPaymentReminder,
  ] = await Promise.all([
    getAllProjects(),
    getUnpaidAndpadPayments(),
    getAllAndpadPayments(),
    getEmployees(),
    getAllStores(),
    getMyOrders(),
    getAllContracts(),
    getAllPaymentReminder(),
  ]);


  // ANDPAD入金一覧の内容からアラート対象を取得する
  const alertPaymentsJson = createPaymentAlertFromAPPayments({
    unpaidAndpadPayments: unpaidAndpadPayments,
    contracts: tgtProjTypeContracts,
    reminders: allPaymentReminder,
    projects: allProjects,
    employees: allMembers,
    stores: allStores,
    allOrders: allOrders,
  });


  // アラートレコードをリマインダーアプリへ登録する
  await registerReminders({
    reminderJson: alertPaymentsJson,
  });


  // 今日までに通知予定のリマインダーレコードを取得する(含：入金一覧から取得したアラート)
  const alertReminder = await getPaymentRemindersByAlertDate(new Date());


  const alertReminderJson = convertReminderToJson({
    reminder: alertReminder,
    andpadPayments: allAndpadPayments,
  });


  return alertReminderJson;

};
