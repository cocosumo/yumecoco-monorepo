import { getCompletedTickets } from './getCompletedTickets';

describe('getCompletedTickets', () => {
  it('should return completed tickets', async () => {
    const result = await getCompletedTickets();

    console.log(result);

    expect(result).toBeTruthy();

  });
});