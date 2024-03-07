import { describe, it } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import { IUnissuedinvoicealert } from 'types';
import { updateReminders } from './updateReminders';



describe('updateReminders', () => {
  // set output file of getRemindersScheduledForToday.test.ts
  const remindersPath = path.join(__dirname, '../__TEST__/reminders.json');
  const remindersDat = JSON.parse(fs.readFileSync(remindersPath, 'utf8')) as IUnissuedinvoicealert[];

  it('本日通知対象のレコードを更新する', async () => {

    await updateReminders({
      recReminders: [remindersDat[0]],
    });

    console.log(`レコードID=${remindersDat[0].$id.value} をkintoneアプリにてご確認ください`);

  }, 10000);

});
