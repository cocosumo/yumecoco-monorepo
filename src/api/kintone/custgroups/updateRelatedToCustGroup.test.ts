import { getCustGroupById } from './getCustGroupById';
import { updateRelatedToCustGroup } from './updateRelatedToCustGroup';

describe('updateRelatedToCustGroup', () => {
  it('should update related custGroup', async () => {
 
    const testData = [
      '183',
    ]; 

    for (const custGroupId of testData) {
      const record = await getCustGroupById(custGroupId);
      const result = await updateRelatedToCustGroup(record, custGroupId);
      console.log(JSON.stringify(result, null, 2));
      expect(result).toBeDefined();
    }
  });
});