import { getAllCustGroups } from 'api-kintone';
import { AppIds } from 'config';
import { ICustgroups, KCustgroups } from 'types';
import { KintoneClientBasicAuth } from '../settings';
import { describe, it } from '@jest/globals';

describe('updateCustGroup', () => {
  const ktr = KintoneClientBasicAuth.record;
  it('should fix agents', async () => {

    const custGroups = await getAllCustGroups();

    const updateKeyField: KCustgroups = 'uuid';

    const result = await ktr.updateAllRecords({
      app: AppIds.custGroups,
      records: custGroups.map((rec) => {
        const newRec : Partial<ICustgroups> = {
          storeId: rec.storeId,
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