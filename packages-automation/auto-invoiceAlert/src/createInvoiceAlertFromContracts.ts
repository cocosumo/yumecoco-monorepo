import { registerReminders } from './helpers/registerReminders';
import { GetMyOrdersResponse } from 'api-andpad';
import { ContractRecordType, IInvoiceReminder } from '../config';
import { IAndpadpayments, IEmployees, IProjects, IStores } from 'types';
import { filterContractsToAlertTarget } from './helpers/filterContractsToAlertTarget';
import { convertContractsToJson } from './helpers/convertContractsToJson';



/**
 * 通知対象の契約レコード情報をまとめて
 * kintoneのリマインダーアプリへ登録します
 */
export const createInvoiceAlertFromContracts = async ({
  allOrders,
  andpadPayments,
  reminders,
  projects,
  employees,
  stores,
  tgtProjTypeContracts,
  allContracts,
}: {
  tgtProjTypeContracts: ContractRecordType[]
  andpadPayments: IAndpadpayments[]
  reminders: IInvoiceReminder[]
  projects: IProjects[]
  employees: IEmployees[]
  stores: IStores[]
  allOrders: GetMyOrdersResponse
  allContracts: ContractRecordType[]
}) => {

  // 契約書の内容からアラート対象を取得する
  const alertContracts = filterContractsToAlertTarget({
    contracts: tgtProjTypeContracts,
    andpadPayments: andpadPayments,
    reminders: reminders,
    projects: projects,
  });

  const consoleContracts1 = alertContracts.map(({ projName }) => projName.value);
  console.log('通知対象の契約', alertContracts.length, consoleContracts1);


  const alertContractsJson = convertContractsToJson({
    contracts: alertContracts,
    allContracts: allContracts,
    projects: projects,
    employees: employees,
    stores: stores,
    allOrders: allOrders,
  });


  const consoleContracts = alertContractsJson.map(({ projName }) => projName);
  console.log('通知対象の契約:絞り込み後', alertContractsJson.length, consoleContracts);

  //throw new Error('アラート対象の抽出が完了しました');

  // 契約書から取得したアラート用データをリマインダーアプリへ登録する
  await registerReminders({
    reminderJson: alertContractsJson,
  });

};
