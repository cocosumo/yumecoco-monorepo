import { describe, it/* , expect */ } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import format from 'date-fns/format';
import { createPaymentAlertFromAPPayments } from './createPaymentAlertFromAPPayments';
import { getAllContracts, getAllProjects, getAllStores, getEmployees } from 'api-kintone';
import { getAllPaymentReminder } from './api-kintone';
import { getUnpaidAndpadPayments } from 'api-kintone/src/andpadPayments/getUnpaidAndpadPayments';


describe('createPaymentAlertFromAPPayments', () => {
  it('should return alert data', async () => {

    const [
      allProjects,
      unpaidAndpadPayments,
      allMembers,
      allStores,
      allContracts,
      allPaymentReminder,
    ] = await Promise.all([
      getAllProjects(),
      getUnpaidAndpadPayments(),
      getEmployees(),
      getAllStores(),
      getAllContracts(),
      getAllPaymentReminder(),
    ]);


    // ANDPAD入金一覧情報より、アラート対象を取得する
    const result = createPaymentAlertFromAPPayments({
      unpaidAndpadPayments: unpaidAndpadPayments,
      employees: allMembers,
      projects: allProjects,
      reminders: allPaymentReminder,
      stores: allStores,
      contracts: allContracts,
    });

    const dir = path.join(__dirname, '__TEST__');

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    // save json file
    fs.writeFileSync(
      path.join(dir, `createPaymentAlertFromAPPayments_${format(new Date(), 'yyyyMMddHHmmss')}.json`),
      JSON.stringify(result, null, 2),
    );
  }, 10000);
});
