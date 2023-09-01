import { describe, it } from '@jest/globals';
import { convertMonthlyProcurement } from './convertMonthlyProcurement';
import fs from 'fs';
import path from 'path';
import { getMonthlyProcurementBySystemId } from 'api-andpad';

// need to run test for getMonthlyProcurementBySystemId, 
// then transfer the result to the following file. 

describe('convertMonthlyProcurement', () => {
  it('should convert monthly procurement', async () => {
    const testSystemId = 11637372;
    const testPath = path.join(__dirname, `./__TEST__/convertMonthlyProcurement_${testSystemId}.json`);

    let testData = Object.create(null);

    if (fs.existsSync(testPath)) {
      testData = JSON.parse(fs.readFileSync(testPath, 'utf8'));
    } else {
      testData = await getMonthlyProcurementBySystemId(testSystemId);
      fs.writeFileSync(testPath, JSON.stringify(testData, null, 2));
    }

    const result = convertMonthlyProcurement(testData);

    fs.writeFileSync(path.join(__dirname, `./__TEST__/convertMonthlyProcurement_${testSystemId}_result.json`), JSON.stringify(result, null, 2));
    
    console.log(JSON.stringify(result, null, 2));
  }, 50000);
});