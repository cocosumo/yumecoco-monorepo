import { getLookUpFields } from './getLookUpFields';
import { APPIDS } from '../config';

describe('getLookUpFields', () => {
  it('should get lookup fields of project', async () => {
    const newRecord = await getLookUpFields(APPIDS.project);
    console.log(newRecord);
    expect(newRecord).toBeDefined();
  });
});