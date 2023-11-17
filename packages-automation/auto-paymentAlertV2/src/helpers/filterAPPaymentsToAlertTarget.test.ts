import { describe, it, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import format from 'date-fns/format';
import { filterAPPaymentsToAlertTarget } from './filterAPPaymentsToAlertTarget';
import { getAllPaymentReminder } from '../api-kintone';
import { getUnpaidAndpadPayments } from 'api-kintone/src/andpadPayments/getUnpaidAndpadPayments';
import { getAllProjects } from 'api-kintone';


describe('filterContractsToAlertTarget', () => {
  it('should return alert date', async () => {

    const [
      unpaidAndpadPayments,
      allPaymentReminders,
      allProjects,
    ] = await Promise.all([
      getUnpaidAndpadPayments(),
      getAllPaymentReminder(),
      getAllProjects(),
    ]);

    const result = filterAPPaymentsToAlertTarget({
      unpaidAndpadPayments: unpaidAndpadPayments,
      reminders: allPaymentReminders,
      allProjects: allProjects,
    });

    const dir = path.join(__dirname, '__TEST__');

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    // save json file
    fs.writeFileSync(
      path.join(dir, `alertTargetList_${format(new Date(), 'yyyyMMddHHmmss')}.json`),
      JSON.stringify(result, null, 2),
    );

    console.log('result.length', result.length);

    // 配列であることを確認
    expect(Array.isArray(result)).toBe(true);

    // 配列の長さが1以上であることを確認
    //expect(result.length).toBeGreaterThan(0);

  });
});
