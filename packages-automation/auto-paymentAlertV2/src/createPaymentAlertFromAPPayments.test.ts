import { describe, it/* , expect */ } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import format from 'date-fns/format';
import { createPaymentAlertFromAPPayments } from './createPaymentAlertFromAPPayments';
import { getAllAndpadPayments, getAllProjects, getAllStores, getEmployees } from 'api-kintone';
import { getMyOrders } from 'api-andpad';
import { filterContractsByTargetProjType } from './helpers/filterContractsByTargetProjType';
import { getAllPaymentReminder } from './api-kintone';


describe('createPaymentAlertFromAPPayments', () => {
  it('should return alert data', async () => {

    const [
      allProjects,
      allAndpadPayments,
      allMembers,
      allStores,
      allOrders,
      tgtProjTypeContracts,
      allPaymentReminder,
    ] = await Promise.all([
      getAllProjects(),
      getAllAndpadPayments(),
      getEmployees(),
      getAllStores(),
      getMyOrders(),
      filterContractsByTargetProjType(),
      getAllPaymentReminder(),
    ]);
  
  
    // 契約書の内容からアラート対象を取得する
    const result = createPaymentAlertFromAPPayments({
      allOrders: allOrders,
      andpadPayments: allAndpadPayments,
      employees: allMembers,
      projects: allProjects,
      reminders: allPaymentReminder,
      stores: allStores,
      tgtProjTypeContracts: tgtProjTypeContracts,
    });

    const dir = path.join(__dirname, '__TEST__');

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    // save json file
    fs.writeFileSync(
      path.join(dir, `paymentAlertContracts_${format(new Date(), 'yyyyMMddHHmmss')}.json`),
      JSON.stringify(result, null, 2),
    );
  }, 10000);
});
