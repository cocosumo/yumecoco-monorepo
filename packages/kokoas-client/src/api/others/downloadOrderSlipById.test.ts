import { describe, expect, it } from '@jest/globals';
import { downloadOrderSlipById } from './downloadOrderSlipById';

describe('downloadOrderSlipById', () => {
  it('should download order slip by id', async () => {
    const tesOrderId =  '0feb1da1-30fd-4ac9-99be-0dbf316de916';
    const result = await downloadOrderSlipById(tesOrderId);

    console.log(result.data);

    expect(result).toHaveProperty('data');

  });
});

