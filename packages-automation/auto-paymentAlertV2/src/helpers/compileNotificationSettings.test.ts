import { describe, it, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { CwRoomIds } from '../../types/paymentReminder';
import { IPaymentReminder, chatworkRooms } from '../../config';
import { compileNotificationSettings } from './compileNotificationSettings';
import { produce } from 'immer';



describe('compileNotificationSettings', () => {
  // set output file of convertRemindersToJson.test.ts
  const remindersPath = path.join(__dirname, '../api-kintone/__TEST__/reminders.json');
  const reminders = JSON.parse(fs.readFileSync(remindersPath, 'utf8')) as IPaymentReminder[];

  const updateSettings: CwRoomIds[] = [{
    agentId: 'dummyId',
    agentName: 'ダミー',
    cwRoomId: chatworkRooms.test,
  }];

  it('値の更新がされる', async () => {
    const testReminder = produce(reminders[0].notificationSettings, draft => {
      draft.value[0].value.alertTargetId.value = 'dummyId';
      draft.value[0].value.alertTargetName.value = 'ダミー';
      draft.value[0].value.chatworkRoomId.value = '';
    });
    console.log('既存の通知先', JSON.stringify(testReminder, null, 2));

    const result = compileNotificationSettings({
      existingSettings: testReminder,
      updateSettings: updateSettings,
    });

    expect(result.value[0].value.chatworkRoomId.value).toBe(chatworkRooms.test);

  }, 60000);

  
  it('値の追加と削除がされる', async () => {
    const testReminder = produce(reminders[0].notificationSettings, draft => {
      draft.value[0].value.alertTargetId.value = 'forDeletCheck';
      draft.value[0].value.alertTargetName.value = '削除確認用';
      draft.value[0].value.chatworkRoomId.value = 'forDeletCheck';
    });
    console.log('既存の通知先', JSON.stringify(testReminder, null, 2));

    const result = compileNotificationSettings({
      existingSettings: testReminder,
      updateSettings: updateSettings,
    });

    expect(result.value[0].value.chatworkRoomId.value).toBe(chatworkRooms.test);
    expect(result.value).toHaveLength(1);

  }, 60000);
});
