import fs from 'fs';
import path from 'path';
import format from 'date-fns/format';
import { describe, it } from '@jest/globals';
import { getAndpadPaymentsCsv } from './getAndpadPaymentsCsv';


describe('get andpad Payment File', () => {
  it('should download csv file from andpad', async () => {

    const result = getAndpadPaymentsCsv();

    const dir = path.join(__dirname, '__TEST__');

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    
    // save json file
    fs.writeFileSync(
      path.join(dir, `getAndpadPaymentsCsv_${format(new Date(), 'yyyyMMddHHmmss')}.json`),
      JSON.stringify(result, null, 2),
    );

  }, 100000);

});