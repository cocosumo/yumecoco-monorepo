import { getAllProjects } from 'api-kintone';
import { AppIds } from 'config';
import { zeroPad } from 'libs';
import { IProjects } from 'types';
import { KintoneClientBasicAuth } from '../settings';
import { expect, describe, it } from '@jest/globals';

describe('addProjId', () => {
  const ktr = KintoneClientBasicAuth.record;
  it('should add id', async () => {

    const record = await getAllProjects();

    //const recWithoutDataId = record.filter(({ dataId }) => !dataId.value);

    const result = await ktr.updateAllRecords({
      app: AppIds.projects,
      records: record.reverse().map((rec, idx) => {

        const storeCode = rec.storeCode.value;
        const year = rec.作成日時.value.substring(2, 4);
        const prefix = `${storeCode}-C${year}`;

        const newRec : Partial<IProjects> = {
          dataId: { value: `${prefix}-${zeroPad(idx + 1)}` },
        };


        return {
          updateKey: {
            field: 'uuid',
            value: rec.uuid.value,
          },
          record: newRec,

        };
      }),
    }).catch(e => console.log(e));



    expect(result).toBeDefined();

  });
});