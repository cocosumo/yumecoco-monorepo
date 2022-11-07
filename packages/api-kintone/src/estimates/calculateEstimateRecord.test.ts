import { getEstimatesById } from './getEstimatesById';
import { calculateEstimateRecord } from './calculateEstimateRecord';

describe('Calculate estimate', () => {
  it('should calculate estimate', async () => {

    const { record } = await getEstimatesById('39');
    const result = await calculateEstimateRecord(record);

    expect(result).toHaveProperty('totalCostPrice');
  }, 10000 );
});