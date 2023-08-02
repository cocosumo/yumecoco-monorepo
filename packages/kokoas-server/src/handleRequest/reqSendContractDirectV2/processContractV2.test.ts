import { ukeoiContractVersion } from 'config';
import { processContractV2 } from './processContractV2';
import { describe, expect, it } from '@jest/globals';

describe('processContractV2', () => {
  it('should porcess electronic contract', async () => {
    console.log(process.env.NODE_ENV);

    const result = await processContractV2(
      {
        contractId: '9d8f1262-0e6b-43ff-a48e-33b300bdd183',
        signMethod: 'electronic',
      },
      'sent',
    ).catch((e) => {
      console.log(e);
      throw new Error(e);
    });

    console.log(result);

    expect(result).toBeTruthy();
  }, 30000);

  it('should porcess wetInk contract', async () => {

    const result = await processContractV2(
      {
        contractId: '9d8f1262-0e6b-43ff-a48e-33b300bdd183',
        signMethod: 'wetInk',
        ukeoiDocVersion: ukeoiContractVersion,
      },
      'sent',
    ).catch((e) => {
      console.log(e);
      throw new Error(e);
    });

    console.log(result);

    expect(result).toBeTruthy();
  }, 30000);

});
