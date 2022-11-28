import { getContractData } from './getContractData';

describe('Contract', () => {
  it('should be able to get contract data', async () => {
    const result = await getContractData({
      projEstimateId: 'dummy02',
      userCode: 'RPA03',
    });

    console.log(result);

    expect(result).toHaveProperty('projId');
  });
});
