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
        const newRec : Partial<IProjestimates> = {
          projId: { value: rec.projId.value },
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