import { IProjects } from './../../../types/src/dbKintone';
import { getAllProjects } from 'api-kintone';
import { AppIds } from 'config';

import { KintoneClientBasicAuth } from '../settings';

describe('updateCustGroup', () => {
  const ktr = KintoneClientBasicAuth.record;
  it('should fix agents', async () => {

    const recs = await getAllProjects();

    const updateKeyField = 'uuid';

    const result = await ktr.updateAllRecords({
      app: AppIds.projects,
      records: recs.map((rec) => {
        const newRec : Partial<IProjects> = {
          //custGroupId_0: rec.tempuuid,
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