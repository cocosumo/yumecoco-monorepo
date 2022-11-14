import { saveProjToCustGroup } from './saveProjToCustGroup';

test('save project transaction', async ()=>{

  const testData: Parameters<typeof saveProjToCustGroup>[0] = {
    custGroupId: '152',
  };

  const result = await saveProjToCustGroup(testData);

  
  expect(result).toBeTruthy();


});