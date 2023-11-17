import { describe, it, expect } from '@jest/globals';
import { getProjById } from 'api-kintone';
import { getYumeAgNames } from './getYumeAgNames';


describe('getYumeAgNames', () => {
  it('should return empty string when no names are resolved', async () => {

    const projcts = await getProjById('66bc6fc7-0ace-45b8-9b58-84ba5da195d0');

    const result = getYumeAgNames({
      agents: projcts.agents,
    });

    expect(result).toBe('');
  }, 60000);


  it('should return yumeAGNames', async () => {

    const projcts = await getProjById('adebcd51-aaea-4150-8b21-7373710408e2');

    const result = getYumeAgNames({
      agents: projcts.agents,
    });

    expect(result).toBe('山豊工建');
  }, 60000);

});
