import { fetchEstimatesById } from '../kintone/estimates/GET';
import { calculateEstimateRecord } from './calculateEstimateRecord';

describe('Calculate estimate', () => {
  it('should calculate estimate', async () => {

    const record = await fetchEstimatesById('39');
    const result = await calculateEstimateRecord(record);

    console.log(result);
    expect(result).toHaveProperty('totalCostPrice');
  }, 10000 );
});