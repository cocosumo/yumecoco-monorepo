import { calculateEstimateRecord } from './calculateEstimateRecord';
import { getEstimateByIdV2 } from '../getEstimateByIdV2';

describe('calculateEstimateRecord', () => {
  
  it('should calculate estimate record', async () => {
    const record = await getEstimateByIdV2('dummy01');

    const calculated = calculateEstimateRecord({ record });
    console.log(calculated);
  });
});