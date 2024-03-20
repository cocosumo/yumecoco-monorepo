import { describe, it, expect } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import { IUnissuedinvoicealert } from 'types';
import { convertReminderToKintone } from './convertReminderToKintone';
import format from 'date-fns/format';
import addWeeks from 'date-fns/addWeeks';



describe('convertReminderToKintone', () => {
  // set output file of getRemindersScheduledForToday.test.ts
  const remindersPath = path.join(__dirname, '../__TEST__/reminders.json');
  const remindersDat = JSON.parse(fs.readFileSync(remindersPath, 'utf8')) as IUnissuedinvoicealert[];

  it('本日通知対象の更新レコードを準備する', () => {

    const result = convertReminderToKintone({
      recReminders: [remindersDat[0]],
    })[0];

    const updateId = remindersDat[0].$id.value;
    const todayStr = format(new Date(), 'yyyy-MM-dd');
    const dateOneWeekLater = format(addWeeks(new Date(), 1), 'yyyy-MM-dd');


    expect(result.id).toBe(updateId);
    expect(result.record?.lastAlertDate?.value).toBe(todayStr);
    expect(result.record?.scheduledAlertDate?.value).toBe(dateOneWeekLater);

  }, 10000);

});
