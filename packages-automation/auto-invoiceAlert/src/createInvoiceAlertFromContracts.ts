import { filterContractsToAlertTarget } from './helpers/filterContractsToAlertTarget';
import { convertContractsToJson } from './helpers/convertContractsToJson';
import { getMyOrders } from 'api-andpad';
import { ContractRecordType, IInvoiceReminder } from '../config';
import { IAndpadpayments, IEmployees, IProjects, IStores } from 'types';



/**
 * 契約アプリからアラート対象レコードを取得する
 */
export const createInvoiceAlertFromContracts = async ({
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
  allOrders: Awaited<ReturnType<typeof getMyOrders>>
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

  return convertContractsToJson({
    contracts: alertContracts,
    allContracts: allContracts,
    projects: projects,
    employees: employees,
    stores: stores,
    allOrders: allOrders,
  });


};
