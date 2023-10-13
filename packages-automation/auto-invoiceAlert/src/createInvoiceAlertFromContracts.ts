import { filterContractsToAlertTarget } from './helpers/filterContractsToAlertTarget';
import { convertContractsToJson } from './helpers/convertContractsToJson';
import { getMyOrders } from 'api-andpad';
import { ContractRecordType, IInvoiceReminder } from '../config';
import { IAndpadpayments, IEmployees, IProjects, IStores } from 'types';



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
}: {
  tgtProjTypeContracts: ContractRecordType[]
  andpadPayments: IAndpadpayments[]
  reminders: IInvoiceReminder[]
  projects: IProjects[]
  employees: IEmployees[]
  stores: IStores[]
  allOrders: Awaited<ReturnType<typeof getMyOrders>>
}) => {

  const alertContracts = filterContractsToAlertTarget({
    contracts: tgtProjTypeContracts,
    andpadPayments: andpadPayments,
    reminders: reminders,
  });


  return convertContractsToJson({
    contracts: alertContracts,
    projects: projects,
    employees: employees,
    stores: stores,
    allOrders: allOrders,
  });


};
