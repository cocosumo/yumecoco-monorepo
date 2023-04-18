import { searchAndpadOrders } from './searchAndpadOrders';

describe('searchAndpadOrders', () => {
  it('should return a list of orders', async () => {
    const result = await searchAndpadOrders();

    console.log(result);
  }, 100000);

} );