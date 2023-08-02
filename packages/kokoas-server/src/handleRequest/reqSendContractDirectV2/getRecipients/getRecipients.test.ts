import { describe, expect, it } from '@jest/globals';
import { getContractDataV2 } from '../getContractDataV2';
import { getRecipients } from './getRecipients';

describe('getRecipients', () => {
  it('should return Electronic recipients', async () => {
    const data = await getContractDataV2({
      contractId: 'f9e39157-232a-4828-8802-9aa89298747f',
      signMethod: 'electronic',
    });

    const recipients = getRecipients({
      ...data,
      projTypeName: '自社物件',
    });

    console.log(JSON.stringify(recipients, null,  2));

    // should have signers property
    expect(recipients).toHaveProperty('signers');
  });
});