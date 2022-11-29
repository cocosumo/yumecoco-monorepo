import { getContractData } from './getContractData';

describe('Contract', () => {
  it('should be able to get contract data', async () => {
    const result = await getContractData({
      projEstimateId: '5e4563ee-f154-47be-9254-4241f9415aea',
      userCode: 'RPA03',
    });

    console.log(result);

    expect(result).toHaveProperty('projId');
  });
});
