import { objArrOfIdAndRevision } from './../../../jestUtils/objArrOfIdAndRevision';
import { APPIDS } from '../config';
import { getCustGroupById } from './getCustGroupById';
import { updateRelatedToCustGroup } from './updateRelatedToCustGroup';

describe('updateRelatedToCustGroup', () => {
  it('should update related custGroup', async () => {
 
    // Keys with known related 
    const testData = [
      '183',
    ]; 

    for (const custGroupId of testData) {
      const record = await getCustGroupById(custGroupId);
      const result = await updateRelatedToCustGroup(record, custGroupId);
      console.log(JSON.stringify(result?.[194].results, null, 2));
      if (!result) {
        throw new Error('Invalid custGroupId');
      }
      expect(result)
        .toEqual(
          expect.objectContaining({
            [APPIDS.project]: expect.objectContaining({
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