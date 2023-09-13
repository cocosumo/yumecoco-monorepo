import { getAllProjects, getAllAndpadPayments, getUsers } from 'api-kintone';
import { getAllPaymentReminder } from './api-kintone';
import { filterContractsByTargetProjType } from './contracts/filterContractsByTargetProjType';
import { filterContractsToAlertTarget } from './contracts/filterContractsToAlertTarget';
import { format } from 'date-fns';
import { convertContractsToJson } from './contracts/convertContractsToJson';
import { convertReminderToJson } from './contracts/convertReminderToJson';


/**
 * 通知対象のレコード情報をまとめます
 */
export const createPaymentAlert = async () => {
  console.log('start create payment reminder');

  // 処理前準備
  // 関連するレコード情報を取得する
  const allProjects = await getAllProjects();
  const allAndpadPayments = await getAllAndpadPayments();
  const allUsers = await getUsers();

  // 契約アプリを参照し、対象の工事種別のレコードを取得する
  const tgtProjTypeContracts = await filterContractsByTargetProjType();

  // 通知対象のレコードのみに絞り込む
  const alertContracts = await filterContractsToAlertTarget({
    contracts: tgtProjTypeContracts,
    andpadPayments: allAndpadPayments,
  });

  const alertContractsJson = convertContractsToJson({
    contracts: alertContracts,
    projects: allProjects,
    users: allUsers,
  });

  // 再通知アプリより、今日通知予定のレコードを取得する - (1)
  const todayStr = format(new Date(), 'yyyy-MM-dd');
  const alertReminder = (await getAllPaymentReminder())
    .filter(({ alertDate }) => alertDate.value === todayStr);

  const alertReminderJson = convertReminderToJson({
    reminder: alertReminder,
  });

  return alertContractsJson.concat(alertReminderJson);
};
