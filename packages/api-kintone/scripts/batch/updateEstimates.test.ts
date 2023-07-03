import { updateEstimates } from './updateEstimates';
import { describe, it, expect } from '@jest/globals';

describe('updateEstimates', ()=>{
  it('should update projEstimates', async ()=>{
    const result = await updateEstimates();

    expect(result).toBeDefined();
  }, 8000);
});
