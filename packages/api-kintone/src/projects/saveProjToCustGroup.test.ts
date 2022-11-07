import { saveProjToCustGroup } from './saveProjToCustGroup';

test('save project transaction', async ()=>{
  try {
    const testData: Parameters<typeof saveProjToCustGroup>[0] = {
      projectId: '97',
      custGroupId: '152',
    };

    const result = await saveProjToCustGroup(testData);

    console.log(result);
  
    expect(result).toBeTruthy();

  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }

});