import { describe, it, expect } from '@jest/globals';
import { getProjTypeById } from './getProjTypeById';

describe('Get Project Types by Id', () => {
  it('should retrieve project type', async () => {
    const projId = '68ee1fa3-93be-43a7-a3d1-e5a77bb1cc43';
    const result = await getProjTypeById(projId);


    console.log('result:', result.label.value);
    
    expect(result.label.value).toBe('新築付帯工事');
  });
});