import { describe, expect, it } from '@jest/globals';
import { getContractDataV2 } from '../getContractDataV2';
import { getRecipients } from './getRecipients';

describe('getRecipients', () => {
  it('should return Electronic recipients', async () => {
    const data = await getContractDataV2({
      contractId: 'a18b4ba7-5377-41a6-9750-ebebb377e8c5',
      signMethod: 'wetInk',
    });

    const recipients = getRecipients({
      ...data,
      projTypeName: 'サービス工事',
    });

    console.log(JSON.stringify(recipients, null,  2));

    // should have signers property
    expect(recipients).toHaveProperty('signers');
  });
});