import { describe, it, expect } from '@jest/globals';
import { updateProjectsConstMembers } from './updateProjectsConstMembers';

describe('updateProjectsConstMembers', ()=>{
  it('should update projects of const members', async ()=>{
    const result = await updateProjectsConstMembers();

    expect(result).toBeDefined();
  }, 8000);
});
