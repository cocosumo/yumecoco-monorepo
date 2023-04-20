import { getAllAndpadOrders } from './getAllAndpadOrders';

describe('getAllAndpadOrders', () => {

  it('should get all orders', async () => {
    const result = await getAllAndpadOrders({
      beforeContractOnly: false,
    });

    console.log('count', result.data.total);
    expect( result.data.total).toEqual(result.data.objects.length);

  }, 1000000);

  it('should get all orders before contract', async () => {
    const result = await getAllAndpadOrders({
      beforeContractOnly: true,
    });

    console.log('count', result.data.total);
    expect( result.data.total )
      .toBeDefined();
  });
});