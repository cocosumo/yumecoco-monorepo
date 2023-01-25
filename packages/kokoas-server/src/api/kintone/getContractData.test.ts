import { getContractData } from './getContractData';

describe('Contract', () => {
  it('should be able to get contract data', async () => {
    const result = await getContractData({
      projEstimateId: 'fd63ce06-1ec5-4667-b93e-470131e8d0c1',
      userCode: 'RPA03',
    });

    console.log(result);

    expect(result).toHaveProperty('projId');
  });
});
