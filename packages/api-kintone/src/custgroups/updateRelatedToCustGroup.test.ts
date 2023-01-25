import { AppIds } from 'config';
import { objArrOfIdAndRevision } from 'utils-jest';

import { updateRelatedToCustGroup } from './updateRelatedToCustGroup';

describe('updateRelatedToCustGroup', () => {
  it('should update related custGroup', async () => {
 
    // Keys with known related 
    const testData = [
      '183',
    ]; 

    for (const custGroupId of testData) {

      const result = await updateRelatedToCustGroup(custGroupId);

      if (!result) {
        throw new Error('Invalid custGroupId');
      }
      expect(result)
        .toEqual(
          expect.objectContaining({
            [AppIds.projects]: expect.objectContaining({
              condition: expect.stringContaining('='),
              results: objArrOfIdAndRevision(),
            }),
          }),
        );
    }
  });

  it('should fail on invalid custGroupId', () => {
    /* TODO */
  });
});