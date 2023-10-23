import { describe, it, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import format from 'date-fns/format';
import { filterContractsToAlertTarget } from './filterContractsToAlertTarget';
import { getAllAndpadPayments } from 'api-kintone';
import { ContractRecordType } from '../../config';
//import addMonths from 'date-fns/addMonths';
import { getAllInvoiceReminder } from '../api-kintone';


describe('filterContractsToAlertTarget', () => {
  it('should return alert date', async () => {

    const contractsPath = path.join(__dirname, './__TEST__/contracts.json');
    const contracts = JSON.parse(fs.readFileSync(contractsPath, 'utf8')) as ContractRecordType[];

    const [
      allAndpadPayments,
      allInvoiceReminders,
    ] = await Promise.all([
      getAllAndpadPayments(),
      getAllInvoiceReminder(),
    ]);

    const result = await filterContractsToAlertTarget({
      contracts: contracts,
      andpadPayments: allAndpadPayments,
      reminders: allInvoiceReminders,
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
