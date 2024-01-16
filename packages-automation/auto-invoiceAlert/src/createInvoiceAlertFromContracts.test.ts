import { describe, it/* , expect */ } from '@jest/globals';
import { createInvoiceAlertFromContracts } from './createInvoiceAlertFromContracts';
import { getAllAndpadPayments, getAllContracts, getAllProjects, getAllStores, getEmployees } from 'api-kintone';
import { filterContractsByTargetProjType } from './helpers/filterContractsByTargetProjType';
import { getAllInvoiceReminder } from './api-kintone';
import { getAllAndpadOrders } from 'api-andpad';


describe('createInvoiceAlertFromContracts', () => {
  it('should return alert data', async () => {

    const [
      allProjects,
      allAndpadPayments,
      allMembers,
      allStores,
      tgtProjTypeContracts,
      allInvoiceReminder,
      allContracts,
      allOrders,
    ] = await Promise.all([
      getAllProjects(),
      getAllAndpadPayments(),
      getEmployees(),
      getAllStores(),
      filterContractsByTargetProjType(),
      getAllInvoiceReminder(),
      getAllContracts(),
      getAllAndpadOrders({ beforeInvoiceIssue: true }),
    ]);


    await createInvoiceAlertFromContracts({
      allContracts: allContracts,
      andpadPayments: allAndpadPayments,
      employees: allMembers,
      projects: allProjects,
      reminders: allInvoiceReminder,
      stores: allStores,
      tgtProjTypeContracts,
      allOrders: allOrders,
    });

    console.log('DBにて実行結果を確認してください');
    
  }, 1000000);
});
