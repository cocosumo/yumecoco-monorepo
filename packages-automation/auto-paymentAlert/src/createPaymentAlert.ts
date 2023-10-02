import { getAllProjects, getAllAndpadPayments, getAllStores, getEmployees } from 'api-kintone';
import { filterContractsByTargetProjType } from './helpers/filterContractsByTargetProjType';
import { filterContractsToAlertTarget } from './helpers/filterContractsToAlertTarget';
import { convertContractsToJson } from './helpers/convertContractsToJson';
import { getMyOrders } from 'api-andpad';
import { registerReminders } from './helpers/registerReminders';
import { getAllPaymentReminder } from './api-kintone';



/**
 * 通知対象の契約レコード情報を、入金確認リマインダーへ登録します
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


  const alertContracts = filterContractsToAlertTarget({
    contracts: tgtProjTypeContracts,
    andpadPayments: allAndpadPayments,
    reminders: allPaymentReminder,
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

};
