import { describe, expect, it } from '@jest/globals';
import { updateStatus } from './updateStatus';
import { getOrderById } from './getOrderById';

describe('updateStatus', () => {
  it('should update status', async () => {
    // replace with existing test order id
    const testOrderId = 'b15feac4-d66f-4cc3-8f90-3e5aba7d1a80';
    
    await updateStatus({
      orderId: testOrderId,
      status: '発注済',
    });

    const newRecord = await getOrderById(testOrderId);
    expect(newRecord?.status.value).toBe('発注済');

    await updateStatus({
      orderId: testOrderId,
      status: '未発注',
    });

    const newRecord2 = await getOrderById(testOrderId);
    expect(newRecord2?.status.value).toBe('未発注s');

  });
});