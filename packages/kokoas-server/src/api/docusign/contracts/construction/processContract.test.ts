import { processContract } from './processContract';


it('should porcess contract', async () => {
  console.log(process.env.NODE_ENV);

  const result = await processContract({
    projEstimateId: 'dummy01',
    userCode: 'RPA03',
    signMethod: 'wetInk',
  },
  'sent',
  );

  //console.log(result);

  expect(result).toMatchSnapshot();
}, 30000);
