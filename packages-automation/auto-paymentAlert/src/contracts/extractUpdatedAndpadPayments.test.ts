import { describe, it } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import format from 'date-fns/format';
import { extractUpdatedAndpadPayments } from './extractUpdatedAndpadPayments';



describe('extractUpdatedAndpadPayments', () => {
  it('should convert monthly procurement', async () => {
    
    const dir = path.join(__dirname, '__TEST__');

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    const result = await extractUpdatedAndpadPayments();


    // save json file
    fs.writeFileSync(
      path.join(dir, `extractUpdatedAndpadPayments_${format(new Date(), 'yyyyMMddHHmmss')}.json`), 
      JSON.stringify(result, null, 2),
    );
  }, 50000);
});
