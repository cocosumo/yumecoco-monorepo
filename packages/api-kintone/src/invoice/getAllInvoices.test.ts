import { getAllInvoices } from './getAllInvoices';
import { describe, it, expect } from '@jest/globals';

describe('invoice', () => {
  it('should get all invoice', async () => {

    const records = await getAllInvoices();

    console.log('取得結果', records);

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