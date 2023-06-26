import { AppIds } from 'config';
import { IEmployees } from 'types';
import { KintoneClientBasicAuth } from '../settings';
import { describe, it } from '@jest/globals';

describe('store migrate', () => {
  const ktr = KintoneClientBasicAuth.record;

  it('should update all lookup', async () => {
    const records = (await ktr.getAllRecords({
      app: AppIds.employees,
    })) as unknown as IEmployees[];



    await ktr.updateAllRecords({
      app: AppIds.employees,
      records: records.map((rec) => {

        const aff: Partial<IEmployees> = {
          mainStoreId_v2: rec.mainStore_v2,
        };

        console.log(aff);
        return {
          id: rec.$id.value,
          record: aff,
        };
      }),
    });
  }, 60000);
});