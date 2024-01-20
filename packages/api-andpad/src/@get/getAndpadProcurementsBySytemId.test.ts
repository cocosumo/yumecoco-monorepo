import { describe, expect, it } from '@jest/globals';
import { fetchAndpadBudgetBySysId, getAndpadProcurementsBySytemId } from './getAndpadProcurementsBySytemId';

describe('getAndpadProcurementsBySytemId', () => {
  const testSysId = 11818744;


  it('should return data', async () => {
    const result = await getAndpadProcurementsBySytemId(testSysId);
    expect(result).toHaveProperty('andpadBudget');
    expect(result).toHaveProperty('procurements');
  }, 100000);

  it('fetchAndpadBudgetBySysId should error on invalid login', async () => {
    expect(fetchAndpadBudgetBySysId(testSysId, 'invalid cookie'))
      .rejects
      .toThrowError();
  }, 10000);

});