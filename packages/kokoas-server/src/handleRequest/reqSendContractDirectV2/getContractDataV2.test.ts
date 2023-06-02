import { getContractDataV2 } from './getContractDataV2';

describe('Contract', () => {
  it('should be able to get contract data', async () => {
    const result = await getContractDataV2({
      contractId: '12128397-14e7-47d5-90b6-f8b655b39988',
      signMethod: 'electronic',
      ukeoiDocVersion: '20230523',
    });

    console.log(result);

    expect(result).toHaveProperty('projId');
  });
});
