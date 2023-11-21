import fs from 'fs';
import path from 'path';
import format from 'date-fns/format';
import { describe, it } from '@jest/globals';
import { chkRecordCondition } from './chkRecordCondition';
import { AndpadCsv } from '../types/types';
import { getUnpaidAndpadPayments } from 'api-kintone/src/andpadPayments/getUnpaidAndpadPayments';


describe('get andpad Payment File', () => {
  it('should download csv file from andpad', async () => {

    // set output file of getAndpadPaymentsCsv.test.ts
    const andpadCsvPath = path.join(__dirname, './__TEST__/andpadPaymentsCsv.json');
    const andpadScvDat = JSON.parse(fs.readFileSync(andpadCsvPath, 'utf8')) as AndpadCsv;

    const unpaidBackupPayments = await getUnpaidAndpadPayments();

    const result = chkRecordCondition({
      andpadPaymentsCsv: andpadScvDat,
      unpaidBackupPayments: unpaidBackupPayments,
    });

    const dir = path.join(__dirname, '__TEST__');

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    // save json file
    fs.writeFileSync(
      path.join(dir, `chkRecordCondition_${format(new Date(), 'yyyyMMddHHmmss')}.json`),
      JSON.stringify(result, null, 2),
    );

  }, 100000);

});