import { describe, it } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import format from 'date-fns/format';
import { getCostMgtDataByProjIdV4 } from './getCostMgtDataByProjIdV4';


describe('getCostMgtDataV4', () => {
  it('should get andpad orders by AndpadProjId', async () => {
    const projId = '404b343c-f38b-4ee3-95c6-b5e670538fe7';

    
    const result = await getCostMgtDataByProjIdV4(projId);

    console.log('result', result);

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
