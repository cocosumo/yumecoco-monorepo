import { describe, it } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import format from 'date-fns/format';
import { convertContractsToRemainder } from './convertContractsToRemainder';
import { extractUpdatedRecords } from './extractUpdatedRecords';
import { IContracts } from 'types';
import { getAllProjects, getAllPaymentRemainder, getAllAndpadPayments } from 'api-kintone';


describe('convertContractsToRemainder', () => {
  it('should convert contracts to Remainder app', async () => {

    const testId = 'e6a8e273-8c62-4fff-82cd-9ca97c97813f';
    const testDataPath = path.join(__dirname, `./__TEST__/testData_${testId}.json`);
    let testData = Object.create(null) as IContracts[];

    if (fs.existsSync(testDataPath)) {
      testData = JSON.parse(fs.readFileSync(testDataPath, 'utf8'));
    } else {
      testData = await extractUpdatedRecords();
      if (!testData) throw new Error('testData is null');
      fs.writeFileSync(
        path.resolve(testDataPath),
        JSON.stringify(testData, null, 2),
      );
    }

    const allProjects = await getAllProjects();
    const allRemainders = await getAllPaymentRemainder();
    const allAndpadPayments = await getAllAndpadPayments();

    const result = await convertContractsToRemainder({
      projTypeContracts: testData,
      projects: allProjects,
      remainders: allRemainders,
      andpadPayments: allAndpadPayments,
    });

    const dir = path.join(__dirname, '__TEST__');

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    // save json file
    fs.writeFileSync(
      path.join(dir, `costMgtData_${testId}_${format(new Date(), 'yyyyMMddHHmmss')}.json`),
      JSON.stringify(result, null, 2),
    );

  }, 60000);
});
