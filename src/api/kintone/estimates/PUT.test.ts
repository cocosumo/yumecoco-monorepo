import { updateEstimateById } from './PUT';
it('updateEstimateById', async ()=>{
  const result = await updateEstimateById(
    '28',
    {
      envStatus: { value: 'test' },
    },
  );


  console.log(result);
});