import { describe, expect, it } from '@jest/globals';
import { getContractReportData } from './getContractReportData';

describe('getContractReportData', () => {
  it('should return contractReportData', async () => {
    const testId = '191ff145-9e3a-4065-a497-6d17a9501be5';
    const result = await getContractReportData(testId);

    console.log(result);

    
    expect(result.contractId).toBe(testId);
  });
});