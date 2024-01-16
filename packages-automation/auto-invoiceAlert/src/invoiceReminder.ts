import { getAllAndpadPayments, getAllContracts, getAllProjects, getAllStores, getEmployees } from 'api-kintone';
import { getAllInvoiceReminder, getInvoiceRemindersByAlertDate } from './api-kintone';
import { createInvoiceAlertFromContracts } from './createInvoiceAlertFromContracts';
import { updateReportedReminders } from './helpers/updateReportedReminders';
import { notifyInvoiceAlertToChatwork } from './notifyInvoiceAlertToChatwork';
import { filterContractsByTargetProjType } from './helpers/filterContractsByTargetProjType';
import { getAllAndpadOrders } from 'api-andpad';
import { convertReminderToJson } from './helpers/convertReminderToJson';


/**
 * 請求書発行アラートを通知します
 */
export const invoiceReminder = async () => {
  console.log('start invoice reminder');

  // 処理前準備
  // 関連するレコード情報を取得する
  const [
    allProjects,
    allAndpadPayments,
    allMembers,
    allStores,
    tgtProjTypeContracts,
    allInvoiceReminder,
    allContracts,
    allOrders,
  ] = await Promise.all([
    getAllProjects(),
    getAllAndpadPayments(),
    getEmployees(),
    getAllStores(),
    filterContractsByTargetProjType(),
    getAllInvoiceReminder(),
    getAllContracts(),
    getAllAndpadOrders({ beforeInvoiceIssue: true }),
  ]);


  await createInvoiceAlertFromContracts({
    andpadPayments: allAndpadPayments,
    allContracts: allContracts,
    reminders: allInvoiceReminder,
    employees: allMembers,
    allOrders: allOrders,
    projects: allProjects,
    stores: allStores,
    tgtProjTypeContracts: tgtProjTypeContracts,
  });


  // 今日通知予定のリマインダーレコードを取得する(含：契約書から取得したアラート)
  const alertReminder = await getInvoiceRemindersByAlertDate(new Date());


  const reminderJson = convertReminderToJson({
    reminder: alertReminder,
    andpadPayments: allAndpadPayments,
    allOrders: allOrders,
    allProjects: allProjects,
    employees: allMembers,
    stores: allStores,
    contracts: allContracts,
  });


  //throw new Error('抽出処理のみ完了');


  // chatworkへの通知処理
  notifyInvoiceAlertToChatwork({
    reminderJson: reminderJson,
  });

  // リマインダーレコードの更新処理
  updateReportedReminders({
    reportedReminder: reminderJson,
    existedReminder: alertReminder,
  });

  console.log('finish invoice reminder');
};
