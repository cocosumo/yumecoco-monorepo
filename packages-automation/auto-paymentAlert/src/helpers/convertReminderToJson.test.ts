import { describe, it } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import format from 'date-fns/format';
import { convertReminderToJson } from './convertReminderToJson';


describe('convertReminderToJson', () => {
  it('should convert reminder data to JSON data', async () => {

    // set output file of getAllPaymentReminder.test.ts
    const remindersPath = path.join(__dirname, './__TEST__/reminders.json');
    const reminders = JSON.parse(fs.readFileSync(remindersPath, 'utf8'));


    const result = await convertReminderToJson({
      reminder: reminders,
    });

    const dir = path.join(__dirname, '__TEST__');

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    // save json file
    fs.writeFileSync(
      path.join(dir, `convertReminderToJson_${format(new Date(), 'yyyyMMddHHmmss')}.json`),
      JSON.stringify(result, null, 2),
    );

  }, 60000);
});
