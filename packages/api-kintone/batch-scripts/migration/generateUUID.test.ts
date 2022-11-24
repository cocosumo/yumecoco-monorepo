/* Prepare field called uuid */

import { getAllRecords } from 'api-kintone';
import { format } from 'date-fns';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';


/**
 * テストじゃなく、独立出来るスクリプトに移行します。
 */
describe('generateUUID', () => {
  const app  = '19';

  it('shoud generate uuid', async () => {
    const records = await getAllRecords<{ uuid: { value: string } }>({
      app,
    });

    const timestamp = format(new Date(), 'yyyy-MM-dd-HHmmss.SSS');

    // Backup
    const filename = `${app}-${timestamp}.json`;
    fs.writeFileSync(path.join(__dirname, 'backup', filename), JSON.stringify(records, null, 2));

    const newRecords = records.map((prev) => {
      if (prev.uuid.value.length < 8) {
        return {
          ...prev,
          uuid: { value: uuidv4() },
        };
      }

      return prev;
    } );

    console.log(newRecords);

    expect(newRecords.every((v) => !!v.uuid.value)).toEqual(true);
  });
});