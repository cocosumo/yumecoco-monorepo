import { voidEnvelope } from './voidEnvelope';
import { expect, describe, it } from '@jest/globals';

describe('Void', ()=>{
  it('should void envelope', async ()=>{
    const result = await voidEnvelope({
      envelopeId: 'c372b5ad-408e-4445-9330-506e825c4d32',
      voidedReason: 'テストで無効化',
    });

    console.log(result.envelopeId);

    /* TODO: Improve assertion */
    expect(result).toBeDefined();
  }, 30000);
});
