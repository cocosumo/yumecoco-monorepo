import { getMyOrders } from './getMyOrders';

describe('getMyOrders', () => {
  it('should get my orders', async () => {

    const result = await getMyOrders();

    console.log(JSON.stringify(result, null, 2));

    expect(result).toBeDefined();
  });
});