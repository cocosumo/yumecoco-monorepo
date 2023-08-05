import { describe, expect } from '@jest/globals';
import { getCostMgtData } from './getCostMgtData';



describe('getCostMgtData', () => {
  it('should get andpad orders by AndpadProjId', async () => {
    const projId = '055c2aca-cbdd-42ab-be2a-e4cd6dd362de';

    const result = await getCostMgtData(projId);

    console.log(result);

    expect(result).toBeDefined();
  });
});
