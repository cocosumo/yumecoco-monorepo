import { describe, it, expect } from '@jest/globals';
import { updateExpectedPaymentDate } from './updateExpectedPaymentDate';
import { getAllContracts } from 'api-kintone';


describe('updateExpectedPaymentDate', () => {
  it('should update expectedPaymentDate', async () => {

    const contracts = await getAllContracts();
    const testProjId = '5e50bc4a-0646-448d-94af-8512bac1e1da';
    const testProjType = '新築工事';
    const testDate = '2023-01-01';

    const result = updateExpectedPaymentDate({
      projId: testProjId,
      projType: testProjType,
      expectedPaymentDate: testDate,
      contracts,
    });

    expect(result).toBe('2024-01-14');
  }, 60000);

  it('should not changed expectedPaymentDate', async () => {

    const contracts = await getAllContracts();
    const testProjId = 'fortestDummy';
    const testProjType = '新築工事';
    const testDate = '2025-01-01';

    const result = updateExpectedPaymentDate({
      projId: testProjId,
      projType: testProjType,
      expectedPaymentDate: testDate,
      contracts,
    });

    expect(result).toBe('2025-01-01');
  }, 60000);

});
