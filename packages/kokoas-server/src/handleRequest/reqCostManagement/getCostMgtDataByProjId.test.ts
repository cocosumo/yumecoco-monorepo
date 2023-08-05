import { describe, expect } from '@jest/globals';
import { getCostMgtDataByProjId } from './getCostMgtDataByProjId';



describe('getCostMgtData', () => {
  it('should get andpad orders by AndpadProjId', async () => {
    const projId = '055c2aca-cbdd-42ab-be2a-e4cd6dd362de';

    const result = await getCostMgtDataByProjId(projId);

    console.log(result);

    expect(result).toMatchSnapshot();
  });
});
