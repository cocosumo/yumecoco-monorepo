import { describe, expect, it } from '@jest/globals';
import { getOrderById } from './getOrderById';

describe('getOrderById', () => {
  it('should return all orderById', async () => {
    const result = await getOrderById('23b4d208-e587-46f8-8d0f-fbb35d4a68cf');

    console.log('result: ', result);

    // record should have $id field
    expect(result)
      .toEqual(expect.objectContaining({ $id: expect.any(Object) }));
  
  });
});