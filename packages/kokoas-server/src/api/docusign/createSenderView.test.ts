import { createSenderView } from './createSenderView';
import { expect, describe, it } from '@jest/globals';

describe('Create sender', () => {

  it('should generate link for sender view', async () => {
    const result = await createSenderView('c372b5ad-408e-4445-9330-506e825c4d32');
    console.log('result', result);

    /* TODO: Improve assertion */
    expect(result).toBeDefined();
  });
});