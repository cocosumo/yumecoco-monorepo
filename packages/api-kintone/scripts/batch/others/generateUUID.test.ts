/* Prepare field called uuid */


import { format } from 'date-fns';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { KintoneClientBasicAuth } from '../settings';
import { expect, describe, it } from '@jest/globals';


/**
 * jestじゃなく、独立に実行出来るスクリプトに移行します。
 */
describe('generateUUID', () => {

  const app  = '204'; // 変更

  const ktr = KintoneClientBasicAuth.record;
  it('shoud generate uuid', async () => {
    const records = await ktr.getAllRecords({
      app,
    });

    const timestamp = format(new Date(), 'yyyy-MM-dd-HHmmss.SSS');

    // Backup
    const filename = `${app}-${timestamp}.json`;
    fs.writeFileSync(path.join(__dirname, 'backup', filename), JSON.stringify(records, null, 2));


    await ktr.updateAllRecords({
      app,
      records: records.map((prev) => {
        const uuidFieldVal = prev?.uuid?.value;
        if (typeof uuidFieldVal === 'string' && uuidFieldVal.length < 8 ) {
          return {
            id: prev.$id.value as string,
            record: {
              uuid: {
                value: uuidv4(),
              },
            },
          };
        }
        return {
          id: '',
        };
      } ).filter((newRec) => !!newRec?.record ),
    }).catch(e => console.log(e));

    const newRecords = await ktr.getAllRecords({
      app,
    });

    expect(newRecords.every((v) => !!v.uuid.value)).toEqual(true);
  });
});