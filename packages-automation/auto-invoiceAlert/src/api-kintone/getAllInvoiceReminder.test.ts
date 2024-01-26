import { describe, it, expect } from '@jest/globals';
import { getAllInvoiceReminder } from './getAllInvoiceReminder';
import fs from 'fs';
import path from 'path';
import format from 'date-fns/format';


describe('getAllInvoiceReminder', () => {
  it('請求書用リマインダーアプリの全レコードを取得します', async () => {
    const result = await getAllInvoiceReminder();

    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].$id).toBeDefined();

    const dir = path.join(__dirname, '__TEST__');

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    // save json file
    fs.writeFileSync(
      path.join(dir, `getAllInvoiceReminder_${format(new Date(), 'yyyyMMddHHmmss')}.json`),
      JSON.stringify(result, null, 2),
    );
  });
});
