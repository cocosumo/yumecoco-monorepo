import { describe, expect } from '@jest/globals';
import { getCostMgtData } from './getCostMgtData';



describe('getCostMgtData', () => {
  it('should get andpad orders by AndpadProjId', async () => {
    const projId = '055c2aca-cbdd-42ab-be2a-e4cd6dd362de';
    const andpadProjId = '11487098';
    const result = await getCostMgtData(projId, andpadProjId);

    console.log(result);

    expect(result).toBeDefined();
  });
});
