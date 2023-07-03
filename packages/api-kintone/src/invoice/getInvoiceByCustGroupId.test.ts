import { getInvoiceByCustGroupId } from './getInvoiceByCustGroupId';
import { describe, it, expect } from '@jest/globals';

describe('invoice', () => {
  it('should get invoice by custGroupId', async () => {

    const { records, totalCount } = await getInvoiceByCustGroupId('fe8029b9-4206-4344-a9d4-6d31918e8bb8');

    console.log('請求内容', totalCount, '件', records);

    expect(records).toEqual(
      expect.arrayContaining(
        [
          expect.objectContaining({
            $id: {
              type: expect.any(String),
              value: expect.any(String),
            },
          }),
        ],
      ),
    );
  }, 10000);
});