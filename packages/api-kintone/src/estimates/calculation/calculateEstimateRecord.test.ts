import { calculateEstimateRecord } from './calculateEstimateRecord';
import { getEstimateById } from '../getEstimateById';

describe('calculateEstimateRecord', () => {
  
  it('should calculate estimate record', async () => {
    const record = await getEstimateById('dummy01');

    const calculated = calculateEstimateRecord({ record });
    console.log(calculated);
  });
});