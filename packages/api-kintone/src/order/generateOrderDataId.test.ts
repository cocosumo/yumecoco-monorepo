import { describe, expect, it } from '@jest/globals';
import { generateOrderDataId, orderDataIdmaxPadding } from './generateOrderDataId';
import format from 'date-fns/format';

describe('generateOrderDataId', () => {
  it('should return orderDataId', async () => {
    // Should have existing data to test against.
    // If there is no existing data, it will be 1.
    const {
      latestRecord,
      newOrderDataId,
    } = await generateOrderDataId();

    const latestRecordOrderDataId = latestRecord?.orderDataId.value 
      || `${format(new Date(), 'yyMMdd')}-${(0).toString().padStart(orderDataIdmaxPadding, '0')}`;
    
    const incrementedId = Number(latestRecordOrderDataId.slice(-orderDataIdmaxPadding)) + 1;
    const expectedNewOrderDataId = `${latestRecordOrderDataId?.slice(0, 6)}-${incrementedId.toString().padStart(orderDataIdmaxPadding, '0')}`;
    
    console.log('Incremented ID:', incrementedId);
    console.log('latest record order data id:', latestRecordOrderDataId);
    console.log('expected new order data id:', expectedNewOrderDataId);
    
    expect(newOrderDataId).toBe(expectedNewOrderDataId);
  });
});