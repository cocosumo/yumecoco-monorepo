import { getAllProjects, getAllAndpadPayments, getAllStores, getEmployees, getAllContracts } from 'api-kintone';
import { filterContractsByTargetProjType } from './helpers/filterContractsByTargetProjType';
import { registerReminders } from './helpers/registerReminders';
import { getAllInvoiceReminder, getInvoiceRemindersByAlertDate } from './api-kintone';
import { createInvoiceAlertFromContracts } from './createInvoiceAlertFromContracts';
import { convertReminderToJson } from './helpers/convertReminderToJson';
import { getAllAndpadOrders } from 'api-andpad';



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


  // 契約書の内容からアラート対象を取得する
  const alertContractsJson = createInvoiceAlertFromContracts({
    allOrders: allOrders,
    andpadPayments: allAndpadPayments,
    employees: allMembers,
    projects: allProjects,
    reminders: allInvoiceReminder,
    stores: allStores,
    tgtProjTypeContracts: tgtProjTypeContracts,
    allContracts: allContracts,
  });

  const consoleContracts = alertContractsJson.map(({ projName }) => projName);
  console.log('通知対象の契約:絞り込み後', alertContractsJson.length, consoleContracts);

  //throw new Error('アラート対象の抽出が完了しました');

  // 契約書から取得したアラート用データをリマインダーアプリへ登録する
  await registerReminders({
    reminderJson: alertContractsJson,
  });

  // 今日通知予定のリマインダーレコードを取得する(含：契約書から取得したアラート)
  const alertReminder = await getInvoiceRemindersByAlertDate(new Date());

  const alertReminderJson = convertReminderToJson({
    reminder: alertReminder,
    andpadPayments: allAndpadPayments,
    allOrders: allOrders,
  });

  
  const consoleReminders = alertReminderJson.map(({ projName }) => projName);
  console.log('通知対象の契約:リマインダー含む', alertReminderJson.length, consoleReminders);

  return alertReminderJson;

};
