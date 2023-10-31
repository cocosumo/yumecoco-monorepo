import { describe, it/* , expect */ } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import format from 'date-fns/format';
import { createInvoiceAlert } from './createInvoiceAlert';


describe('createInvoiceAlert', () => {
  it('should return alert data', async () => {

    const result = await createInvoiceAlert();

    const dir = path.join(__dirname, '__TEST__');

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    // save json file
    fs.writeFileSync(
      path.join(dir, `createInvoiceAlert_${format(new Date(), 'yyyyMMddHHmmss')}.json`),
      JSON.stringify(result, null, 2),
    );
  }, 10000);
});
