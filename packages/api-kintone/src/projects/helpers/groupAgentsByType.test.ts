import { describe, expect, it } from '@jest/globals';
import { getProjById } from '../getProjById';
import { groupAgentsByType } from './groupAgentsByType';

describe('getAgentsByType', () => {
  it('should return agents by type', async () => {
    const projRec = await getProjById('adebcd51-aaea-4150-8b21-7373710408e2');

    const result = groupAgentsByType(projRec.agents);

    console.log(result);

    expect(result).toBeDefined();
  });
});