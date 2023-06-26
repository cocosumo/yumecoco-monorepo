
import {  getAllProjects } from 'api-kintone';
import { AppIds } from 'config';
import { IProjects } from 'types';
import { describe, it } from '@jest/globals';

import { KintoneClientBasicAuth } from '../settings';

describe('updateCustGroup', () => {
  const ktr = KintoneClientBasicAuth.record;
  it('should fix agents', async () => {

    const recs = await getAllProjects();
    //const recsCustGroup = await getAllCustGroups();

    const updateKeyField = 'uuid';

    const result = await ktr.updateAllRecords({
      app: AppIds.projects,
      records: recs.map((rec) => {
        const oldId = rec.dataId.value;
        const newRec : Partial<IProjects> = {
          dataId: { value: oldId.slice(0, 8) + oldId.slice(9) },
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