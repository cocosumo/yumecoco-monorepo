import { updateRelatedToCustGroup } from './updateRelatedToCustGroup';
import { objArrOfIdAndRevision } from '../../../jestUtils/objArrOfIdAndRevision';

describe('updateRelatedToCustGroup', () => {
  it('should update related custGroup', async () => {
    const testData = [
      '183',
    ]; 
    
    for (const custGroupId of testData) {
      const result = await updateRelatedToCustGroup(custGroupId);
      
      expect(result)
        .toEqual(
          expect.objectContaining({
            records: objArrOfIdAndRevision(),
          }),
          
        );
    }
  });
});