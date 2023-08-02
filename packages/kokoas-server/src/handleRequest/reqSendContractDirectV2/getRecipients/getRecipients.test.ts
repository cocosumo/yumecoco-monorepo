import { describe, expect, it } from '@jest/globals';
import { getContractDataV2 } from '../getContractDataV2';
import { getRecipients } from './getRecipients';

describe('getRecipients', () => {
  it('should return Electronic recipients', async () => {
    const data = await getContractDataV2({
      contractId: 'ed521df8-2bce-4cf6-bc6b-5bc6419054fd',
      signMethod: 'electronic',
    });

    const recipients = getRecipients(data);

    console.log(JSON.stringify(recipients, null,  2));

    // should have signers property
    expect(recipients).toHaveProperty('signers');
  });
});