import { updateCustGroup } from './updateCustGroup';
import { expect, describe, it } from '@jest/globals';

describe('updateCustGroup', ()=>{
  it('should update custGroup', async ()=>{
    const result = await updateCustGroup();

    expect(result).toBeDefined();
  }, 80000);
});
