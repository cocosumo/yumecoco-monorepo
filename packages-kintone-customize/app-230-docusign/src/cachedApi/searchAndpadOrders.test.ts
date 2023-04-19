import { searchAndpadOrders } from './searchAndpadOrders';

describe('searchAndpadOrders', () => {
  it('should return a list of orders', async () => {
    const result = await searchAndpadOrders('テスト');
    
    expect(result.data.objects[0].案件名).toContain('テスト');
  }, 100000);

} );