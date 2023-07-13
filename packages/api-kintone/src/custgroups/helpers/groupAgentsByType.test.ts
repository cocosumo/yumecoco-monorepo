import { describe, expect, it } from '@jest/globals';
import { groupAgentsByType } from './groupAgentsByType';
import { getCustGroupById } from '../getCustGroupById';

describe('getAgentsByType', () => {
  it('should return agents by type', async () => {
    const custGroupRec = await getCustGroupById('fe8029b9-4206-4344-a9d4-6d31918e8bb8');

    const result = groupAgentsByType(custGroupRec.agents);

    console.log(result);

    expect(result).toBeDefined();
  });
});