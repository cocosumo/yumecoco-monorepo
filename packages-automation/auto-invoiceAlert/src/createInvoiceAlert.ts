import { getAllProjects, getAllAndpadPayments, getAllStores, getEmployees } from 'api-kintone';
import { filterContractsByTargetProjType } from './helpers/filterContractsByTargetProjType';
import { getMyOrders } from 'api-andpad';
import { registerReminders } from './helpers/registerReminders';
import { getAllInvoiceReminder, getInvoiceRemindersByAlertDate } from './api-kintone';
import { createInvoiceAlertFromContracts } from './createInvoiceAlertFromContracts';
import { convertReminderToJson } from './helpers/convertReminderToJson';



/**
 * 通知対象の契約レコード情報をまとめます
 */
export const createInvoiceAlert = async () => {
  console.log('start create invoice reminder');

  // 処理前準備
  // 関連するレコード情報を取得する
  const [
    allProjects,
    allAndpadPayments,
    allMembers,
    allStores,
    allOrders,
    tgtProjTypeContracts,
    allInvoiceReminder,
  ] = await Promise.all([
    getAllProjects(),
    getAllAndpadPayments(),
    getEmployees(),
    getAllStores(),
    getMyOrders(),
    filterContractsByTargetProjType(),
    getAllInvoiceReminder(),
  ]);


  // 契約書の内容からアラート対象を取得する
  const alertContractsJson = createInvoiceAlertFromContracts({
    allOrders: allOrders,
    andpadPayments: allAndpadPayments,
    employees: allMembers,
    projects: allProjects,
    reminders: allInvoiceReminder,
    stores: allStores,
    tgtProjTypeContracts: tgtProjTypeContracts,
  });

  // 契約書から取得したアラート用データをリマインダーアプリへ登録する
  await registerReminders({
    reminderJson: alertContractsJson,
  });

  // 今日通知予定のリマインダーレコードを取得する(含：契約書から取得したアラート)
  const alertReminder = await getInvoiceRemindersByAlertDate(new Date());

  const alertReminderJson = convertReminderToJson({
    reminder: alertReminder,
    andpadPayments: allAndpadPayments,
  });


  return alertReminderJson;

};
