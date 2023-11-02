import { describe, it/* , expect */ } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import format from 'date-fns/format';
import { createInvoiceAlertFromContracts } from './createInvoiceAlertFromContracts';
import { getAllAndpadPayments, getAllContracts, getAllProjects, getAllStores, getEmployees } from 'api-kintone';
import { getMyOrders } from 'api-andpad';
import { filterContractsByTargetProjType } from './helpers/filterContractsByTargetProjType';
import { getAllInvoiceReminder } from './api-kintone';


describe('createInvoiceAlertFromContracts', () => {
  it('should return alert data', async () => {

    const [
      allProjects,
      allAndpadPayments,
      allMembers,
      allStores,
      allOrders,
      tgtProjTypeContracts,
      allInvoiceReminder,
      allContracts,
    ] = await Promise.all([
      getAllProjects(),
      getAllAndpadPayments(),
      getEmployees(),
      getAllStores(),
      getMyOrders(),
      filterContractsByTargetProjType(),
      getAllInvoiceReminder(),
      getAllContracts(),
    ]);


    const result = await createInvoiceAlertFromContracts({
      allContracts: allContracts,
      allOrders: allOrders,
      andpadPayments: allAndpadPayments,
      employees: allMembers,
      projects: allProjects,
      reminders: allInvoiceReminder,
      stores: allStores,
      tgtProjTypeContracts,
    });

    const dir = path.join(__dirname, '__TEST__');

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    // save json file
    fs.writeFileSync(
      path.join(dir, `createInvAlrtFromContracts_${format(new Date(), 'yyyyMMddHHmmss')}.json`),
      JSON.stringify(result, null, 2),
    );
  }, 10000);
});
