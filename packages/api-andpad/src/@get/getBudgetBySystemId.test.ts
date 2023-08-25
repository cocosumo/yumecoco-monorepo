import { describe, it } from '@jest/globals';
import { getBudgetBySystemId } from './getBudgetBySystemId';
import fs from 'fs';
import path from 'path';


describe('getBudgetBySystemId', () => {

  it('should return data', async () => {
    const result = await getBudgetBySystemId(11487098);

    console.log(result.data[0]);


    fs.writeFileSync(path.resolve(__dirname, '__TEST__', './getBudgetBySystemId.json'), JSON.stringify(result, null, 2));

  }, 50000);
});