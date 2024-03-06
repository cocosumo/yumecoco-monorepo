import { describe, it, expect } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import { IUnissuedinvoicealert } from 'types';
import { createReminderMsgForAccountant } from './createReminderMsgForAccountant';



describe('createReminderMsgForAccountant', () => {
  // set output file of getRemindersScheduledForToday.test.ts
  const remindersPath = path.join(__dirname, '../../__TEST__/reminders.json');
  const remindersDat = JSON.parse(fs.readFileSync(remindersPath, 'utf8')) as IUnissuedinvoicealert[];

  it('経理担当者用の通知メッセージを作成する', async () => {
    const result = createReminderMsgForAccountant({
      recReminder: remindersDat,
    });

    console.log(result);

    expect(result).toContain('【ココアス】お客さまへの請求書の作成が遅れているようです');

  }, 10000);

});
