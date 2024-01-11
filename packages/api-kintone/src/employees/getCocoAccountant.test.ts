import { getCocoAccountant } from './getCocoAccountant';
import { describe, it, expect } from '@jest/globals';

describe('getCocoAccountant', () => {
  it('should get cocosumo area manager by territory', async () => {
    const result = await getCocoAccountant();
    console.log(result);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].役職.value).toEqual('経理');
  });
});
