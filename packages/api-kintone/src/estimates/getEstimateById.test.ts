import { getEstimateById } from './getEstimateById';

describe('Estimate', () => {
  it('should get estimate by id', async () => {

    const { record } = await getEstimateById('75');

    expect(record).toHaveProperty('$id');
  }, 10000 );
});