import { addMembers } from '../@post';
import { addDelMembers } from './addDelMembers';

describe('addDelMembers', () => {
  const systemId = '10776817';
  const testMembers = [
    //'2878b722-da66-44e0-934c-3f130154bbdc', // 高橋
    'c606e9ef-22c9-4dac-a064-556708811d99', // 林
  ];
  beforeAll(async () => {
    // Prepare test data
    const members = [
      '2878b722-da66-44e0-934c-3f130154bbdc', // 高橋
      'c606e9ef-22c9-4dac-a064-556708811d99', // 林
    ];
    await addMembers({ systemId, members });

  });

  it('should add delete members', async () => {
    const result = await addDelMembers({
      systemId,
      members: testMembers,
    });

    console.log(result);
  });
});