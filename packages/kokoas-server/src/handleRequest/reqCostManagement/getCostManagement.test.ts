import { describe, expect } from '@jest/globals';
import { getCostManagement } from './getCostManagement';
import { dummyData } from './dummyData';



describe('getCostManagement', () => {
  it('should get andpad orders by AndpadProjId', async () => {
    const projId = '055c2aca-cbdd-42ab-be2a-e4cd6dd362de';
    const andpadProjId = '11487098';
    const result = await getCostManagement(projId, andpadProjId, dummyData);

    console.log(result, '取引先件数', result.length);

    expect(result).toBeDefined();
  });
});
