import { expect, describe, it } from '@jest/globals';
import { getAllOrdersAfterContract } from './getAllOrdersAfterContract';

describe('getAllAndpadOrders', () => {

  it('should get all orders', async () => {
    const result = await getAllOrdersAfterContract({
      afterContractOnly: false,
    });

    console.log('count', result.data.total);
    expect( result.data.total).toEqual(result.data.objects.length);

  }, 1000000);

  it('should get all orders after contract', async () => {
    const result = await getAllOrdersAfterContract({
      afterContractOnly: true,
    });

    console.log('count', result.data.total);
    expect( result.data.total )
      .toBeDefined();
  });
});
