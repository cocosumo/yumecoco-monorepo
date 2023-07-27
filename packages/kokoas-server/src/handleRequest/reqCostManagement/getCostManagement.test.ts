import { describe, expect } from '@jest/globals';
import { getCostManagement } from './getCostManagement';
import { dummyData } from './dummyData';



describe('getCostManagement', () => {
  it('should get andpad orders by AndpadProjId', async () => {
    const result = await getCostManagement(dummyData);

    console.log(result, '取引先件数', result.length);

    expect(result).toBeDefined();
  });
});
