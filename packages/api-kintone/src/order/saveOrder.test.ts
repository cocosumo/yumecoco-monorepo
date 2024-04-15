import { describe, expect, it } from '@jest/globals';
import { saveOrder } from './saveOrder';



describe('saveOrder', () => {

  it('should save order with minimum required fields', async () => {
    const result = await saveOrder({
      recordId: 'test',
      record:{
        orderName: { value: 'test order name' },
        orderId: { value: 'test' },
      },
    });

    expect(result).toHaveProperty('revision');
  });

  // TODO: Add tests
});