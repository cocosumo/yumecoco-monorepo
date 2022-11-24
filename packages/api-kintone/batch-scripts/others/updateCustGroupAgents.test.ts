import { getAllCustGroups } from 'api-kintone';
import { AppIds } from 'config';
import { ICustgroups, KCustgroups } from 'types';
import { KintoneClientBasicAuth } from '../settings';

/* */
describe('updateCustGroupAgents', () => {
  const ktr = KintoneClientBasicAuth.record;
  it('should fix', async () => {

    const custGroups = await getAllCustGroups();

    const updateKeyField: KCustgroups = 'uuid';

    const result = await ktr.updateAllRecords({
      app: AppIds.custGroups,
      records: custGroups.map((rec) => {
        const prevRow = rec.agents_0.value;
        const newRec : Partial<ICustgroups> = {
          agents_0: {
            type: 'SUBTABLE',
            value: rec.agents.value.map((row, idx) => {
              return {
                id: '',
                value: {
                  ...prevRow?.[idx]?.value,
                  agentType_0: { value: row.value.agentType.value },
                  employeeId_0: { value: row.value.empId.value },
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