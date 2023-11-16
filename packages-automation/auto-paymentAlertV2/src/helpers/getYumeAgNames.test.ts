import { describe, it, expect } from '@jest/globals';
import { getProjById } from 'api-kintone';
import { getYumeAgNames } from './getYumeAgNames';


describe('getYumeAgNames', () => {
  it('getYumeAgNames', async () => {

    const projcts = await getProjById('1d5236c7-ee92-47dc-8a10-4db2055b2358');

    const result = getYumeAgNames({
      agents: projcts.agents,
    });

    expect(result).toBe('取得に失敗しました');
  }, 60000);


  it('getYumeAgNames', async () => {

    const projcts = await getProjById('adebcd51-aaea-4150-8b21-7373710408e2');

    const result = getYumeAgNames({
      agents: projcts.agents,
    });

    expect(result).toBe('山豊工建');
  }, 60000);

});
