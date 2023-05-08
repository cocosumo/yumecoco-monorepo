import { processContractV2 } from './processContractV2';


it('should porcess contract', async () => {
  console.log(process.env.NODE_ENV);

  // prepare data 


  // TODO: handle dlete 

  const result = await processContractV2(
    {
      contractId: '12128397-14e7-47d5-90b6-f8b655b39988',
      signMethod: 'electronic',
      ukeoiDocVersion: '20230501',
    },
    'sent',
  ).catch((e) => {
    console.log(e);
    throw new Error(e);
  });

  console.log(result);

  expect(result).toBeTruthy();
}, 30000);
