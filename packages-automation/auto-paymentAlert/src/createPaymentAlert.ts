import { getAllProjects, getAllAndpadPayments, getAllStores, getEmployees } from 'api-kintone';
import { filterContractsByTargetProjType } from './helpers/filterContractsByTargetProjType';
import { filterContractsToAlertTarget } from './helpers/filterContractsToAlertTarget';
import { convertContractsToJson } from './helpers/convertContractsToJson';
import { convertReminderToJson } from './helpers/convertReminderToJson';
import { getMyOrders } from 'api-andpad';
import { getPaymentRemindersByAlertDate } from './api-kintone/getPaymentRemindersByAlertDate';
import { registerReminders } from './helpers/registerReminders';



/**
 * 通知対象のレコード情報をまとめます
 */
export const createPaymentAlert = async () => {
  console.log('start create payment reminder');

  // 処理前準備
  // 関連するレコード情報を取得する
  const [
    allProjects,
    allAndpadPayments,
    allMembers,
    allStores,
    allOrders,
    tgtProjTypeContracts,
    alertReminder,
  ] = await Promise.all([
    getAllProjects(),
    getAllAndpadPayments(),
    getEmployees(),
    getAllStores(),
    getMyOrders(),
    filterContractsByTargetProjType(),
    getPaymentRemindersByAlertDate(new Date()),
  ]);


  // 通知対象のレコードのみに絞り込む
  // 契約書から通知対象を取得する
  const alertContracts = filterContractsToAlertTarget({
    contracts: tgtProjTypeContracts,
    andpadPayments: allAndpadPayments,
  });

  const alertContractsJson = convertContractsToJson({
    contracts: alertContracts,
    projects: allProjects,
    employees: allMembers,
    stores: allStores,
    allOrders: allOrders,
  });

  await registerReminders({
    reminderJson: alertContractsJson,
  });


  // リマインダーアプリから通知対象を取得する
  const alertReminderJson = convertReminderToJson({
    reminder: alertReminder,
    //andpadPayments: allAndpadPayments,
  });

  return alertContractsJson.concat(alertReminderJson);
};
