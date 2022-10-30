import { updateRelatedToCustGroup } from './updateRelatedToCustGroup';

describe('updateRelatedToCustGroup', () => {
  it('should update related custGroup', async () => {
    const testData = [
      '183',
    ]; 

    for (const custGroupId of testData) {
      const result = await updateRelatedToCustGroup(custGroupId);
      console.log(JSON.stringify(result, null, 2));
      expect(result).toBeDefined();
    }
  });
});