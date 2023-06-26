import { getAllCustGroups } from 'api-kintone';
import { AppIds } from 'config';
import { ICustgroups, KCustgroups } from 'types';
import { KintoneClientBasicAuth } from '../settings';
import { describe, it } from '@jest/globals';

/* */
describe('updateCustGroupAgents', () => {
  const ktr = KintoneClientBasicAuth.record;
  it('should fix members', async () => {

    const custGroups = await getAllCustGroups();

    const updateKeyField: KCustgroups = 'uuid';

    const result = await ktr.updateAllRecords({
      app: AppIds.custGroups,
      records: custGroups.map((rec) => {
        const prevRow = rec.members.value;

        const newRec : Partial<ICustgroups> = {
          members: {
            type: 'SUBTABLE',
            value: rec.members.value.map((row, idx) => {
              return {
                id: '',
                value: {
                  ...prevRow?.[idx]?.value,
                  custId: {
                    value: row.value.custId.value,
                  },
                },
              };
            }),
          },
          
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