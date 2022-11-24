import { AppIds } from 'config';
import { IEmployees } from 'types';
import { KintoneClientBasicAuth } from '../settings';

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
          affiliateStores_0: {
            type: 'SUBTABLE',
            value: rec.affiliateStores.value.map(() => {

            }),
          },
          affiliateStores: {
            type: 'SUBTABLE',
            value: rec.affiliateStores.value.map((row) => {
              const { value: { storeId } } = row;

              return {
                id:'',
                value: {
                  ...row.value,
                  storeId: { value: storeId.value },
                },
              };
            }),
          },
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