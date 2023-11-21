import { getAllProjects, getAllAndpadPayments, getAllStores, getEmployees, getAllContracts } from 'api-kintone';
import { registerReminders } from './helpers/registerReminders';
import { getAllPaymentReminder, getPaymentRemindersByAlertDate } from './api-kintone';
import { createPaymentAlertFromAPPayments } from './createPaymentAlertFromAPPayments';
import { convertReminderToJson } from './helpers/convertReminderToJson';
import { getUnpaidAndpadPayments } from 'api-kintone/src/andpadPayments/getUnpaidAndpadPayments';
import { getAllAndpadOrders } from 'api-andpad';



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
    allAndpadOrders,
    tgtProjTypeContracts,
    allPaymentReminder,
  ] = await Promise.all([
    getAllProjects(),
    getUnpaidAndpadPayments(),
    getAllAndpadPayments(),
    getEmployees(),
    getAllStores(),
    getAllAndpadOrders({ beforeInvoiceIssue: true }),
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
  });


  // アラートレコードをリマインダーアプリへ登録する
  await registerReminders({
    reminderJson: alertPaymentsJson,
  });


  // 今日までに通知予定のリマインダーレコードを取得する(含：入金一覧から取得したアラート)
  const alertReminders = await getPaymentRemindersByAlertDate(new Date());


  const alertReminderJson = convertReminderToJson({
    reminders: alertReminders,
    andpadPayments: allAndpadPayments,
    allAndpadOrders: allAndpadOrders,
    allProjects: allProjects,
  });


  return alertReminderJson;

};
