import { updateMembers } from './updateMembers';

describe('updateMembers', () => {
  const members = ['2878b722-da66-44e0-934c-3f130154bbdc'];
  const systemId = '10776817';
  it('should return updated_members', async () => {
    const result = await updateMembers({
      members,
      systemId,
    });
    console.log(result);
    expect(result.updated_members).toBeDefined();

  });

  it('should return errors for invalid members', async () => {
    const result = await updateMembers({
      members: ['invalid-member'],
      systemId,
    });
    console.log(result);
    expect(result).toHaveProperty('errors');

  });
});