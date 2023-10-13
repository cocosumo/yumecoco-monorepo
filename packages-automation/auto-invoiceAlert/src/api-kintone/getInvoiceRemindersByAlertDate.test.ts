import { describe, it, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import format from 'date-fns/format';
import { getInvoiceRemindersByAlertDate } from './getInvoiceRemindersByAlertDate';


describe('getInvoiceRemindersByAlertDate', () => {
  it('通知対象日の入金確認リマインダーのレコードを取得します', async () => {
    const result = await getInvoiceRemindersByAlertDate(new Date());

    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].$id).toBeDefined();

    const dir = path.join(__dirname, '__TEST__');

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    // save json file
    fs.writeFileSync(
      path.join(dir, `getInvoiceRemindersByAlertDate_${format(new Date(), 'yyyyMMddHHmmss')}.json`),
      JSON.stringify(result, null, 2),
    );
  });
});
