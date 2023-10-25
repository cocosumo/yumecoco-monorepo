import { getAllProjects, getAllAndpadPayments, getAllStores, getEmployees } from 'api-kintone';
import { filterContractsByTargetProjType } from './helpers/filterContractsByTargetProjType';
import { getMyOrders } from 'api-andpad';
import { registerReminders } from './helpers/registerReminders';
import { getAllPaymentReminder, getPaymentRemindersByAlertDate } from './api-kintone';
import { createPaymentAlertFromContracts } from './createPaymentAlertFromContracts';
import { convertReminderToJson } from './helpers/convertReminderToJson';



/**
 * 通知対象の契約レコード情報をまとめます
 */
export const createPaymentAlert = async () => {
  console.log('start create payment reminder ver2');

  const [
    allProjects,
    allAndpadPayments,
    allMembers,
    allStores,
    allOrders,
    tgtProjTypeContracts,
    //alertReminder,
    allPaymentReminder,
  ] = await Promise.all([
    getAllProjects(),
    getAllAndpadPayments(),
    getEmployees(),
    getAllStores(),
    getMyOrders(),
    filterContractsByTargetProjType(),
    //getPaymentRemindersByAlertDate(new Date()),
    getAllPaymentReminder(),
  ]);


  // 契約書の内容からアラート対象を取得する
  const alertContractsJson = createPaymentAlertFromContracts({
    allOrders: allOrders,
    andpadPayments: allAndpadPayments,
    employees: allMembers,
    projects: allProjects,
    reminders: allPaymentReminder,
    stores: allStores,
    tgtProjTypeContracts: tgtProjTypeContracts,
  });

  // 契約書から取得したアラート用データをリマインダーアプリへ登録する
  await registerReminders({
    reminderJson: alertContractsJson,
  });

  // 今日通知予定のリマインダーレコードを取得する(含：契約書から取得したアラート)
  const alertReminder = await getPaymentRemindersByAlertDate(new Date());

  const alertReminderJson = convertReminderToJson({
    reminder: alertReminder,
    andpadPayments: allAndpadPayments,
  });


  return alertReminderJson;

};
