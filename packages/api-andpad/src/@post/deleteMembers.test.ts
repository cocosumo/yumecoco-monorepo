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

    console.log('delete members for testing.');
    const {} = await deleteMembers({
      members,
      systemId,
    });


    const {} = await getMembers({
      systemId,
    });


    // assert that there is a member with the given key
    expect(result).toHaveProperty('removed_members');

  });
});