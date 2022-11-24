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
          affStores: {
            type: 'SUBTABLE',
            value: rec.affiliateStores.value.map((refRow, idx) => {
              const { value: { storeUUID } } = refRow;
              
              const thisRow = rec.affStores.value?.[idx]?.value;

              return {
                id: '',
                value: {
                  ...thisRow,
                  affStoreId: { value: storeUUID.value },  
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