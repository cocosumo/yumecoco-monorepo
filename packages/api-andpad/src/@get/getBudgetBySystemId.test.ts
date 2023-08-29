import { describe, it } from '@jest/globals';
import { getBudgetBySystemId } from './getBudgetBySystemId';
import fs from 'fs';
import path from 'path';


describe('getBudgetBySystemId', () => {

  it('should return data', async () => {
    const testSystemId = 11648284;
    const result = await getBudgetBySystemId(testSystemId);

    console.log(result.data[0]);


    fs.writeFileSync(path.join(__dirname, `__TEST__/getBudgetBySystemId_${testSystemId}.json`), JSON.stringify(result, null, 2));

  }, 50000);
});