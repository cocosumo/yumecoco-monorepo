import { describe, it } from '@jest/globals';
import { getCostMgtDataByProjIdV2 } from './getCostMgtDataByProjIdV2';
import fs from 'fs';
import path from 'path';
import format from 'date-fns/format';


describe('getCostMgtDataV2', () => {
  it('should get andpad orders by AndpadProjId', async () => {
    const projId = 'b16e9a2d-3b7e-453b-8e64-fce7347f5c7b';

    const result = await getCostMgtDataByProjIdV2(projId);

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
