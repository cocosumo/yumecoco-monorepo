import { getSystemUpdate } from './getSystemUpdate';

describe('getSystemUpdate', () => {
  it('should get a record', async () => {
    const record = await getSystemUpdate();
    console.log(record);

    expect(record).toHaveProperty('records');
  });
});