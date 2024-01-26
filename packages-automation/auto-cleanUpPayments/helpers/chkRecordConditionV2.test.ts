import fs from 'fs';
import path from 'path';
import format from 'date-fns/format';
import { describe, it } from '@jest/globals';
import { getUnpaidAndpadPayments } from 'api-kintone/src/andpadPayments/getUnpaidAndpadPayments';
import { ParseResult } from 'papaparse';
import { AndpadCsvData } from '../types/types';
import { chkRecordConditionV2 } from './chkRecordConditionV2';


describe('get andpad Payment File v2', () => {
  it('should download csv file from andpad', async () => {

    // set output file of getAndpadPaymentsCsv.test.ts
    const andpadCsvPath = path.join(__dirname, './__TEST__/andpadPaymentsCsv.json');
    const andpadScvDat = JSON.parse(fs.readFileSync(andpadCsvPath, 'utf8')) as ParseResult<AndpadCsvData>;

    const unpaidBackupPayments = await getUnpaidAndpadPayments();

    const result = chkRecordConditionV2({
      andpadPaymentsCsv: andpadScvDat,
      unpaidBackupPayments: unpaidBackupPayments,
    });

    const dir = path.join(__dirname, '__TEST__');

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    // save json file
    fs.writeFileSync(
      path.join(dir, `chkRecordConditionV2_${format(new Date(), 'yyyyMMddHHmmss')}.json`),
      JSON.stringify(result, null, 2),
    );

  }, 100000);

});