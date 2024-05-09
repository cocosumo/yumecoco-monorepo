import { describe, expect } from '@jest/globals';
import { getSupplierById } from './getSupplierById';

describe('get supplier data by supplierId', () => {

  test('should get supplier data by supplierId', async () => {

    const result = await getSupplierById('Q7VSRPYJ');

    console.log(result);

    expect(result).toEqual(
      expect.objectContaining({
        $id: {
          type: expect.any(String),
          value: expect.any(String),
        },
      }),
    );
  });
});
