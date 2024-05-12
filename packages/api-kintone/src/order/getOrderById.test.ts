import { describe, expect, it } from '@jest/globals';
import { getOrderById } from './getOrderById';

describe('getOrderById', () => {
  it('should return all orderById', async () => {
    const result = await getOrderById('ef398608-b68a-4cc6-8bdc-fc40747d8cbd');

    console.log('result: ', result);

    // record should have $id field
    expect(result)
      .toEqual(expect.objectContaining({ $id: expect.any(Object) }));
  
  });
});