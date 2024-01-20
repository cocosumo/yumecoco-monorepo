import { describe, expect, it } from '@jest/globals';
import { fetchAndpadBudgetBySysId, getAndpadProcurementsBySytemId } from './getAndpadProcurementsBySytemId';
import { getAndpadCookies } from './getAndpadCookie';

describe('getAndpadProcurementsBySytemId', () => {
  let cookieStr = '';
  const testSysId = 11818744;
  beforeAll(async () => {
    cookieStr = await getAndpadCookies(); 
    // Cookieが無効な場合、一回、getAndpadCookieSession を実行してください。
  });

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

  it('fetchAndpadBudgetBySysId should return null if no data exist', async () => {
    const result = await fetchAndpadBudgetBySysId(1111111, cookieStr);
    expect(result).toBeNull();
  }, 10000);
});