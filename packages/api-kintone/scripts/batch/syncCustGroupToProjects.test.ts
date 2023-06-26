import { syncCustGroupToProjects } from './syncCustGroupToProjects';
import { expect, describe, it } from '@jest/globals';

describe('syncCustGroupToProjects', ()=>{
  it('should update projects', async ()=>{
    const result = await syncCustGroupToProjects();

    expect(result).toBeDefined();
  }, 8000);
});
