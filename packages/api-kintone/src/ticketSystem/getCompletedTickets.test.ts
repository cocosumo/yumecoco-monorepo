import { getCompletedTickets } from './getCompletedTickets';
import { describe, it, expect } from '@jest/globals';

describe('getCompletedTickets', () => {
  it('should return completed tickets', async () => {
    const result = await getCompletedTickets();

    console.log(result);

    expect(result).toBeTruthy();

  });
});