import { describe, it } from '@jest/globals';
import { getCostMgtDataByProjIdV2 } from './getCostMgtDataByProjIdV2';
import fs from 'fs';
import path from 'path';
import format from 'date-fns/format';


describe('getCostMgtDataV2', () => {
  it('should get andpad orders by AndpadProjId', async () => {
    const projId = '055c2aca-cbdd-42ab-be2a-e4cd6dd362de';

    const result = await getCostMgtDataByProjIdV2(projId);

    // save json file
    fs.writeFileSync(
      path.join(__dirname, '/__TEST__', `costMgtData${format(new Date(), 'yyyyMMddHHmmss')}.json`), 
      JSON.stringify(result, null, 2),
    );

  }, 60000);
});
