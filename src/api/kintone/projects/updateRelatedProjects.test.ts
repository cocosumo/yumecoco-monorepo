import { updateRelatedProjects } from './updateRelatedProjects';

describe('updateRelatedProjects', () => {
  it('should update related projId', async () => {
    const testData = [
      '123',
      ['123', '119'],
    ]; 

    console.log('testData', testData);
    
    for (const projId of testData) {
      const result = await updateRelatedProjects(projId);
      console.log(JSON.stringify(result, null, 2));
      expect(result).toBeDefined();
    }

  });


});