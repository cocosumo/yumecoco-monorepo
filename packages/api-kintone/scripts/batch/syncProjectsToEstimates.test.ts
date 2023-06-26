import { syncProjectsToEstimates } from './syncProjectsToEstimates';
import { expect, describe, it } from '@jest/globals';

describe('syncProjectsToEstimates', ()=>{
  it('should update estimates', async ()=>{
    const result = await syncProjectsToEstimates();

    expect(result).toBeDefined();
  }, 8000);
});
