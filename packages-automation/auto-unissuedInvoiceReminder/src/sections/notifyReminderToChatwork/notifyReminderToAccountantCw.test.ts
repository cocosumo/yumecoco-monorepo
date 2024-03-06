import { describe, it } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import { IUnissuedinvoicealert } from 'types';
import { notifyReminderToAccountantCw } from './notifyReminderToAccountantCw';



/** 注：テスト実行前にauto-unissuedInvoiceReminder内の.envファイルの設定を確認すること
 *  設定により通知先が変わるため、ご注意ください
 */
describe('notifyReminderToAccountantCw', () => {
  // set output file of getRemindersScheduledForToday.test.ts
  const remindersPath = path.join(__dirname, '../__TEST__/reminders.json');
  const remindersDat = JSON.parse(fs.readFileSync(remindersPath, 'utf8')) as IUnissuedinvoicealert[];

  it('経理担当者用の通知メッセージを作成する', async () => {
    await notifyReminderToAccountantCw({
      recReminders: remindersDat,
    });

    console.log('chatworkにてご確認ください');

  }, 10000);

});
