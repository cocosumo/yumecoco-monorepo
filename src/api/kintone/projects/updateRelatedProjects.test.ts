import { updateRelatedProjects } from './updateRelatedProjects';
import { objArrOfIdAndRevision } from '../../../jestUtils/objArrOfIdAndRevision';
import { es } from 'date-fns/locale';

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
          .map(({ id, revision }) => `${id}:${revision}`)
          .join(','));

      console.log('Updated: ', recIds);

      if (!recIds) {
        console.log('No records to update.');
      } else {
        expect(result)
          .toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                records: objArrOfIdAndRevision(),
              }),
            ]),
          );
      }
    }



  });
});