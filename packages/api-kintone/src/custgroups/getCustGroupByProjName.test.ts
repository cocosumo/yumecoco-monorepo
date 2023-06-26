import { getCustGroupByProjName } from './getCustGroupByProjName';
import { describe, it, expect } from '@jest/globals';

describe('getCustGroupByProjName', () => {
  it('should get custgroup with matching projName', async ()=> {
    const result = await getCustGroupByProjName('早川');
    
    expect(result.length).toBeGreaterThan(0);
  });
});