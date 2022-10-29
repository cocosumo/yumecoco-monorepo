import { updateRelatedProjects } from './updateRelatedProjects';
import { objArrOfIdAndRevision } from '../../../jestUtils/objArrOfIdAndRevision';

describe('updateRelatedProjects', () => {
  it('should update related projId', async () => {
    const testData = [
      '123',
      ['122', '121'],
    ]; 

    console.log('testData', testData);
    
    for (const projId of testData) {
      const result = await updateRelatedProjects(projId);

      const recIds = result
        .map(({ records }) => records
          .map(({ id, revision }) => `${id}:${revision}`).join(','));

      console.log(recIds);

      expect(result)
        .toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              records: objArrOfIdAndRevision(),
            }),
          ]),
        );
    }

  });
});