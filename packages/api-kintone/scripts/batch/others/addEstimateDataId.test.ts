import { getAllEstimates, getAllProjects } from 'api-kintone';
import { AppIds } from 'config';
import { zeroPad } from 'libs';
import { IProjects } from 'types';
import { KintoneClientBasicAuth } from '../settings';
import { expect, describe, it } from '@jest/globals';

describe('addProjId', () => {
  const ktr = KintoneClientBasicAuth.record;
  it('should add id', async () => {

    const recProjs = await getAllProjects();
    const record = await getAllEstimates();

    const recWithoutDataId = record.filter(({ dataId }) => !dataId.value);

    const result = await ktr.updateAllRecords({
      app: AppIds.projEstimates,
      records: recWithoutDataId.reverse().map((rec) => {

        let sequenceNumber = 1;
        const recIdx = record.findIndex(({ uuid }) => uuid.value === rec.uuid.value);
        const recProj = recProjs.find(({ uuid }) => uuid.value === rec.projId.value);
        const projDataId = recProj?.dataId.value;
        if (!projDataId) throw new Error('Invalid projDataId');

        const highestSequenceNumber = Math.max(...record
          .filter(({ projId }) => projId.value ===  rec.projId.value )
          .map(({ dataId }) => +(dataId.value.split('-').at(-1) ?? 0)));


        if (highestSequenceNumber) {
          sequenceNumber += highestSequenceNumber;
        }



        const newDataId = `${projDataId}-${zeroPad(sequenceNumber, 2)}`;
        record[recIdx].dataId.value = newDataId;

        const newRec : Partial<IProjects> = {
          dataId: { value: newDataId },
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


    console.log(result);

    expect(result).toBeDefined();

  });
});