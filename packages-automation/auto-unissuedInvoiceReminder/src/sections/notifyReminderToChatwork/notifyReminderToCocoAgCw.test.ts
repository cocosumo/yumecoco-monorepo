import { describe, it } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import { IUnissuedinvoicealert } from 'types';
import { notifyReminderToCocoAgCw } from './notifyReminderToCocoAgCw';
import { getEmployees } from 'api-kintone';



/** 注：テスト実行前にauto-unissuedInvoiceReminder内の.envファイルの設定を確認すること
 *  設定により通知先が変わるため、ご注意ください
 */
describe('notifyReminderToCocoAgCw', () => {
  // set output file of getRemindersScheduledForToday.test.ts
  const remindersPath = path.join(__dirname, '../__TEST__/reminders.json');
  const remindersDat = JSON.parse(fs.readFileSync(remindersPath, 'utf8')) as IUnissuedinvoicealert[];

  it('営業担当者用の通知メッセージを作成する', async () => {
    const recEmployees = await getEmployees();

    await notifyReminderToCocoAgCw({
      recEmployees,
      recReminders: [remindersDat[0]],
    });

    console.log('chatworkにてご確認ください');

  }, 10000);

});
