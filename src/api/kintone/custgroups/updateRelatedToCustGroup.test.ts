import { updateRelatedToCustGroup } from './updateRelatedToCustGroup';
import { objArrOfIdAndRevision } from '../../../jestUtils/objArrOfIdAndRevision';

describe('updateRelatedToCustGroup', () => {
  it('should update related custGroup', async () => {
    const testData = [
      '184',
    ]; 
    
    for (const custGroupId of testData) {
      const result = await updateRelatedToCustGroup(custGroupId);

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