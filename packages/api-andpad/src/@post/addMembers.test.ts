import { addMembers } from './addMembers';

describe('addMembers', () => {
  it('should return added members', async () => {
    const members = ['2878b722-da66-44e0-934c-3f130154bbdc'];
    const result = await addMembers({
      systemId: '10776817',
      members: members,
      sendNotification: false,
    });

    // assert that there is a member with the given key
    expect(result).toHaveProperty('joined_members');

  });
});