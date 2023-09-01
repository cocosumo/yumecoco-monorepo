import { describe, it } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import format from 'date-fns/format';
import { getCostMgtDataByProjIdV4 } from './getCostMgtDataByProjIdV4';


describe('getCostMgtDataV4', () => {
  it('should get andpad orders by AndpadProjId', async () => {
    const projId = '2805a722-1ed7-44f9-8317-ca8da7640e06';

    const result = await getCostMgtDataByProjIdV4(projId);

    const dir = path.join(__dirname, '__TEST__');

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    // save json file
    fs.writeFileSync(
      path.join(dir, `costMgtData_${projId}_${format(new Date(), 'yyyyMMddHHmmss')}.json`), 
      JSON.stringify(result, null, 2),
    );

  }, 60000);
});
