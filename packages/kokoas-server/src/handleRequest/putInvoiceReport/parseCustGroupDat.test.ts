import { getCustGroupById } from 'api-kintone';
import { parseCustGroupDat } from './parseCustGroupDat';
import { expect, describe, it } from '@jest/globals';

describe('parsing custGroup record', () => {
  it('should validate file', async () => {
    const recCustDat = await getCustGroupById('fe8029b9-4206-4344-a9d4-6d31918e8bb8');
    const result = await parseCustGroupDat(recCustDat);
    
    console.log(result);

    expect(result).toHaveProperty('members');
  });
});