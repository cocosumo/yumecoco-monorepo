import { getEstimatesById } from './getEstimatesById';

describe('Estimate', () => {
  it('should get estimate by id', async () => {

    const { record } = await getEstimatesById('75');

    expect(record).toHaveProperty('$id');
  }, 10000 );
});