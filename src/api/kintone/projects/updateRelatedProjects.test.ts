import { updateRelatedProjects } from './updateRelatedProjects';

describe('updateRelatedProjects', () => {
  it('should update related projId', async () => {
    const testData = [
      '123',
      //['122', '121'],
    ]; 

    console.log('testData', testData);
    
    for (const projId of testData) {
      const result = await updateRelatedProjects(projId);
      const ids = result.records.map(({ id, revision }) => `${id}:${revision}` ).join(', ');

      console.log(`Rows: ${result.records.length}, Ids: ${ids}`);

      expect(result).toHaveProperty('records');
      
    }

  });


});