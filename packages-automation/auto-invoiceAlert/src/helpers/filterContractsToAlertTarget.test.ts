import { describe, it, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import format from 'date-fns/format';
import { filterContractsToAlertTarget } from './filterContractsToAlertTarget';
import { getAllAndpadPayments, getAllProjects } from 'api-kintone';
//import addMonths from 'date-fns/addMonths';
import { getAllInvoiceReminder } from '../api-kintone';
import { filterContractsByTargetProjType } from './filterContractsByTargetProjType';


describe('filterContractsToAlertTarget', () => {
  it('should return alert date', async () => {

    console.log('env_mode', process.env);

    const [
      allAndpadPayments,
      allInvoiceReminders,
      allProjects,
      tgtContracts,
    ] = await Promise.all([
      getAllAndpadPayments(),
      getAllInvoiceReminder(),
      getAllProjects(),
      filterContractsByTargetProjType(),
    ]);

    const result = await filterContractsToAlertTarget({
      contracts: tgtContracts,
      andpadPayments: allAndpadPayments,
      reminders: allInvoiceReminders,
      projects: allProjects,
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
    expect(result.length).toBeGreaterThan(0);

  });
});
