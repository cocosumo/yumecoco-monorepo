import { describe, it, expect } from '@jest/globals';
import { getRemindersScheduledForToday } from './getRemindersScheduledForToday';
import fs from 'fs';
import path from 'path';



describe('getRemindersScheduledForToday', () => {
  it('should get reminder datas by alert date', async () => {

    const result = await getRemindersScheduledForToday();

    expect(result.length).toBeGreaterThan(0);

    const dir = path.join(__dirname, '__TEST__');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    // save json file
    fs.writeFileSync(
      path.join(dir, 'reminders.json'),
      JSON.stringify(result, null, 2),
    );
  }, 1000000);
});
