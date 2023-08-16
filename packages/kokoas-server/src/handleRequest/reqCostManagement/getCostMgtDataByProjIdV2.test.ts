import { describe, expect } from '@jest/globals';
import { getCostMgtDataByProjIdV2 } from './getCostMgtDataByProjIdV2';



describe('getCostMgtDataV2', () => {
  it('should get andpad orders by AndpadProjId', async () => {
    const projId = '055c2aca-cbdd-42ab-be2a-e4cd6dd362de';

    const result = await getCostMgtDataByProjIdV2(projId);

    console.log(result);

    expect(result).toMatchSnapshot();
  });
});
