import { getMembers } from '../@get/getMembers';
import { addMembers } from './addMembers';
import { deleteMembers } from './deleteMembers';

describe('addMembers', () => {
  it('should return added members', async () => {
    const members = ['2878b722-da66-44e0-934c-3f130154bbdc'];
    const systemId = '10776817';
    console.log('add members for testing.');

    await addMembers({
      members,
      systemId,
    });

    
    const delResult = await deleteMembers({
      members,
      systemId,
    });
    console.log('deleted result:', delResult);

    if ('errors' in delResult) {
      console.log('削除済み', JSON.stringify(delResult.errors, null, 2));
    }


    const { data } = await getMembers({
      systemId,
    });

    expect(data.find((member) => member.common_id === members[0])).toBeUndefined();

  });
});