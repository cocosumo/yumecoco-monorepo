import { getProjById } from './getProjById';
import { updateRelatedProjects } from './updateRelatedProjects';

describe('updateRelatedProjects', () => {
  it('should update related projId', async () => {
    const testData = [
      '123',
    ]; 
    
    for (const projId of testData) {
      const projRecord = await getProjById(projId); 

      const result = await updateRelatedProjects(projId, projRecord);
      console.log(JSON.stringify(result, null, 2));

      /* TODO: Retrieved resulting records and test if it matches the input */
      expect(result).toBeDefined();
    }

  });


});