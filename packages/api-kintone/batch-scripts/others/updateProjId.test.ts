import { IProjects } from './../../../types/src/dbKintone';
import {  getAllProjects } from 'api-kintone';
import { AppIds } from 'config';

import { KintoneClientBasicAuth } from '../settings';

describe('updateCustGroup', () => {
  const ktr = KintoneClientBasicAuth.record;
  it('should fix agents', async () => {

    const recs = await getAllProjects();
    //const recsCustGroup = await getAllCustGroups();

    const updateKeyField = 'uuid';
    /*
    const mustDeleteRecs = recs.filter(({ custGroupId }) => {
      return  !recsCustGroup.find(({ uuid }) => uuid.value === custGroupId.value );

    });

    const mustUpdateRecs = recs.filter(({ custGroupId }) => {
      return  recsCustGroup.find(({ uuid }) => uuid.value === custGroupId.value );

    }); */


    const result = await ktr.updateAllRecords({
      app: AppIds.projects,
      records: recs.map((rec) => {
        const newRec : Partial<IProjects> = {
          agents: {
            type: 'SUBTABLE',
            value: rec.agents.value.map((row) => {
              return {
                id: '',
                value: {
                  ...row.value,
                  agentId_0: { value: '' },
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
    }).catch(e => console.log(e));

    console.log(result);
  }, 60000);
});