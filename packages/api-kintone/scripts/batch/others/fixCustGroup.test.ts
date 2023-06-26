import { getAllCustGroups, getAllStores } from 'api-kintone';
import { AppIds } from 'config';
import { ICustgroups, KCustgroups } from 'types';
import { KintoneClientBasicAuth } from '../settings';
import { describe, it } from '@jest/globals';

/* Fix */
describe('fixCustGroup', () => {
  const ktr = KintoneClientBasicAuth.record;
  it('should fix', async () => {
    const stores = await getAllStores();
    const custGroups = await getAllCustGroups();

    const updateKeyField: KCustgroups = 'uuid';

    const result = await ktr.updateAllRecords({
      app: AppIds.custGroups,
      records: custGroups.map((rec) => {

        const storeName = rec.storeName.value;

        const newStoreId = stores.find(({ 店舗名 }) => 店舗名.value === storeName);

        const newRec : Partial<ICustgroups> = {
          storeId: { value: newStoreId?.uuid.value || '' },
        };

        return {
          updateKey: {
            field: updateKeyField,
            value: rec.uuid.value,
          },
          record: newRec,

        };
      }),
    });
    
    console.log(result);
  }, 60000);
});