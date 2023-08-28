import { describe, it } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import format from 'date-fns/format';
import { getCostMgtDataByProjIdV4 } from './getCostMgtDataByProjIdV4';


describe('getCostMgtDataV4', () => {
  it('should get andpad orders by AndpadProjId', async () => {
    const projId = '055c2aca-cbdd-42ab-be2a-e4cd6dd362de';

    const result = await getCostMgtDataByProjIdV4(projId);

    const dir = path.join(__dirname, '/__TEST__');

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    // save json file
    fs.writeFileSync(
      path.join(dir, `costMgtData${format(new Date(), 'yyyyMMddHHmmss')}.json`), 
      JSON.stringify(result, null, 2),
    );

  }, 60000);
});
