import { describe, expect, it } from '@jest/globals';
import { getCostMgtExcelByData } from './getCostMgtExcelByData';
import fs from 'fs';

// generate test data first from getCostMgtDataByProjIdV2
//import testData from './__TEST__/costMgt.json'; 

describe('getCostMgtExcelByData', () => {
  it('should return result', async () => {
    // Change to fs to prevent type checking error
    const testData = JSON.parse(fs.readFileSync('./src/api/others/__TEST__/costMgt.json', 'utf8'));

    const result = await getCostMgtExcelByData(testData as any);
    console.log(result);

    expect(typeof result).toBe('object');
  });
});