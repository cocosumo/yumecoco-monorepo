import { processContractV2 } from './processContractV2';
import { expect, it } from '@jest/globals';


it('should porcess contract', async () => {
  console.log(process.env.NODE_ENV);

  // prepare data 


  // TODO: handle dlete 

  const result = await processContractV2(
    {
      contractId: '9d8f1262-0e6b-43ff-a48e-33b300bdd183',
      signMethod: 'electronic',
      ukeoiDocVersion: '20230605',
    },
    'sent',
  ).catch((e) => {
    console.log(e);
    throw new Error(e);
  });

  console.log(result);

  expect(result).toBeTruthy();
}, 30000);
