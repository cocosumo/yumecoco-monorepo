import { getSystemUpdate } from './getSystemUpdate';
import { describe, it, expect } from '@jest/globals';

describe('getSystemUpdate', () => {
  it('should get a record', async () => {
    const record = await getSystemUpdate();
    console.log(record);

    expect(record).toHaveProperty('records');
  });
});