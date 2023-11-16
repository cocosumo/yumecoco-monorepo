import { describe } from '@jest/globals';
import { updateSingleCustGroup } from './updateSingleCustGroup';

describe('updateSingleCustGroup', () => {
  it('calls KintoneRecord.updateRecord with correct parameters', async () => {
    const result = await updateSingleCustGroup();

    console.log(result);
  });
});