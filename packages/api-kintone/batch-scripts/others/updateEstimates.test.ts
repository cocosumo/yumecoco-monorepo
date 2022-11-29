import { AppIds } from 'config';
import {  IProjestimates, KProjestimates } from 'types';
import { KintoneClientBasicAuth } from '../settings';

describe('updateCustGroup', () => {
  const ktr = KintoneClientBasicAuth.record;
  it('should fix agents', async () => {

    const recs = (await ktr.getAllRecords({
      app: AppIds.projEstimates,
    })) as unknown as IProjestimates[];

    const updateKeyField: KProjestimates = 'uuid';

    const result = await ktr.updateAllRecords({
      app: AppIds.projEstimates,
      records: recs.map((rec) => {
        const oldId =  rec.dataId.value;
        const newRec : Partial<IProjestimates> = {
          dataId: { value: oldId.slice(0, 8) + oldId.slice(9) },
        };

        console.log(newRec);

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