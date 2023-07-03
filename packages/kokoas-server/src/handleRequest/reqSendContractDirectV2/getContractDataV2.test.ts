import { getContractDataV2 } from './getContractDataV2';
import { expect, describe, it } from '@jest/globals';

describe('Contract', () => {
  it('should be able to get contract data', async () => {
    const result = await getContractDataV2({
      contractId: 'ed521df8-2bce-4cf6-bc6b-5bc6419054fd',
      signMethod: 'electronic',
      ukeoiDocVersion: '20230605',
    });

    console.log(result);

    expect(result).toHaveProperty('projId');
  });
});
