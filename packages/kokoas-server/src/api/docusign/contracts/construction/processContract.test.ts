import { processContract } from './processContract';
import { it, expect } from '@jest/globals';


it('should porcess contract', async () => {
  console.log(process.env.NODE_ENV);

  const result = await processContract(
    {
      projEstimateId: '5e4563ee-f154-47be-9254-4241f9415aea',
      userCode: 'RPA03',
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
