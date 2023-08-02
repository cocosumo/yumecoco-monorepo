import { describe, expect } from '@jest/globals';
import { getAndpadOrdersByAndpadProjId } from './getAndpadOrdersByAndpadProjId';

describe('getAndpadOrdersByAndpadProjId.test', () => {
  it('should get andpad orders by AndpadProjId', async () => {
    const andpadProjId = '11487098';
    const result = await getAndpadOrdersByAndpadProjId(andpadProjId);

    console.log(result);

    expect(result).toBeDefined();
  });
});