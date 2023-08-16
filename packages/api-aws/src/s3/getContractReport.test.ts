import { getContractReport } from './getContractReport';

describe('getContractReport', () => {
  it('should getContractReport', async () => {
    const result = await getContractReport();
    console.log(result);
  });
});