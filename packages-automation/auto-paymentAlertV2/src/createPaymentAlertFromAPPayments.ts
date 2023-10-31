import { filterAPPaymentsToAlertTarget } from './helpers/filterAPPaymentsToAlertTarget';
import { convertPaymentsToJson } from './helpers/convertPaymentsToJson';
import { getMyOrders } from 'api-andpad';
import { IPaymentReminder } from '../config';
import { IAndpadpayments, IContracts, IEmployees, IProjects, IStores } from 'types';



/**
 * ANDPAD入金一覧からアラート対象レコードを取得する
 */
export const createPaymentAlertFromAPPayments = ({
  contracts,
  unpaidAndpadPayments,
  reminders,
  projects,
  employees,
  stores,
  allOrders,
}: {
  contracts: IContracts[]
  unpaidAndpadPayments: IAndpadpayments[]
  reminders: IPaymentReminder[]
  projects: IProjects[]
  employees: IEmployees[]
  stores: IStores[]
  allOrders: Awaited<ReturnType<typeof getMyOrders>>
}) => {

  const alertPayments = filterAPPaymentsToAlertTarget({
    unpaidAndpadPayments: unpaidAndpadPayments,
    reminders: reminders,
  });


  return convertPaymentsToJson({
    alertPayments: alertPayments,
    contracts: contracts,
    projects: projects,
    employees: employees,
    stores: stores,
    allOrders: allOrders,
  });


};
