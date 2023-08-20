import { describe, expect, it } from '@jest/globals';
import { getCostMgtExcelByData } from './getCostMgtExcelByData';

// generate test data first from getCostMgtDataByProjIdV2
import testData from './__TEST__/costMgt.json'; 

describe('getCostMgtExcelByData', () => {
  it('should return result', async () => {

    const result = await getCostMgtExcelByData(testData);
    console.log(result);

    expect(typeof result).toBe('object');
  });
});