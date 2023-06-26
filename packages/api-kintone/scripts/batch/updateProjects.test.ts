import { updateProjects } from './updateProjects';
import { describe, it, expect } from '@jest/globals';

describe('updateProjects', ()=>{
  it('should update projects', async ()=>{
    const result = await updateProjects();

    expect(result).toBeDefined();
  }, 8000);
});
