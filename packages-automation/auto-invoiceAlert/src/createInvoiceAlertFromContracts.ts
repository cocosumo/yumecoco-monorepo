import { filterContractsToAlertTarget } from './helpers/filterContractsToAlertTarget';
import { convertContractsToJson } from './helpers/convertContractsToJson';
import { ContractRecordType, IInvoiceReminder } from '../config';
import { IAndpadpayments, IEmployees, IProjects, IStores } from 'types';
//import { getTargetAndpadOrders } from './helpers/getTargetAndpadOrders';
import { GetMyOrdersResponse } from 'api-andpad';



/**
 * 契約アプリからアラート対象レコードを取得する
 */
export const createInvoiceAlertFromContracts = ({
  tgtProjTypeContracts,
  andpadPayments,
  reminders,
  projects,
  employees,
  stores,
  allOrders,
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

  const alertContracts = filterContractsToAlertTarget({
    contracts: tgtProjTypeContracts,
    andpadPayments: andpadPayments,
    reminders: reminders,
    projects: projects,
  });

  const consoleContracts = alertContracts.map(({ projName }) => projName.value);
  console.log('通知対象の契約', alertContracts.length, consoleContracts);


  // ANDPAD案件一覧の取得処理
  /* const tgtOrders = await getTargetAndpadOrders({
    contracts: alertContracts,
    projects: projects,
  }); */


  return convertContractsToJson({
    contracts: alertContracts,
    allContracts: allContracts,
    projects: projects,
    employees: employees,
    stores: stores,
    allOrders: allOrders,
  });


};
