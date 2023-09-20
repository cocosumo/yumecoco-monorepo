import { getAllProjects, getAllAndpadPayments, getUsers, getAllStores } from 'api-kintone';
import { filterContractsByTargetProjType } from './helpers/filterContractsByTargetProjType';
import { filterContractsToAlertTarget } from './helpers/filterContractsToAlertTarget';
import { convertContractsToJson } from './helpers/convertContractsToJson';
import { convertReminderToJson } from './helpers/convertReminderToJson';
import { getMyOrders } from 'api-andpad';
import { getPaymentRemindersByAlertDate } from './api-kintone/getPaymentRemindersByAlertDate';


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
    allUsers,
    allStores,
    allOrders,
    tgtProjTypeContracts,
    alertReminder,
  ] = await Promise.all([
    getAllProjects(),
    getAllAndpadPayments(),
    getUsers(),
    getAllStores(),
    getMyOrders(),
    filterContractsByTargetProjType(),
    getPaymentRemindersByAlertDate(new Date()),
  ]);


  // 通知対象のレコードのみに絞り込む
  const alertContracts = filterContractsToAlertTarget({
    contracts: tgtProjTypeContracts,
    andpadPayments: allAndpadPayments,
  });

  const alertContractsJson = convertContractsToJson({
    contracts: alertContracts,
    projects: allProjects,
    users: allUsers,
    stores: allStores,
    allOrders: allOrders,
  });

  const alertReminderJson = convertReminderToJson({
    reminder: alertReminder,
  });

  return alertContractsJson.concat(alertReminderJson);
};
