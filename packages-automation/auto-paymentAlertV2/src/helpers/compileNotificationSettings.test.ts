import { describe, it } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import format from 'date-fns/format';
import { CwRoomIds } from '../../types/paymentReminder';
import { IInvoiceReminder } from '../../../auto-invoiceAlert/config';
import { chatworkRooms } from '../../config';
import { compileNotificationSettings } from './compileNotificationSettings';



describe('compileNotificationSettings', () => {
  it('should convert contract data to JSON data', async () => {

    // set output file of getInvoiceRemindersByAlertDate.test.ts
    const remindersPath = path.join(__dirname, '../api-kintone/__TEST__/reminders.json');
    const reminders = JSON.parse(fs.readFileSync(remindersPath, 'utf8')) as IInvoiceReminder[];

    const updateSettings: CwRoomIds[] = [{
      agentId: 'dummyId',
      agentName: 'ダミー',
      cwRoomId: chatworkRooms.test,
    }];


    const reminder = reminders[0].notificationSettings;
    console.log('既存の通知先', JSON.stringify(reminder, null, 2));

    const result = compileNotificationSettings({
      exsistingSettings: reminder,
      updateSettings: updateSettings,
    });

    const dir = path.join(__dirname, '__TEST__');

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    // save json file
    fs.writeFileSync(
      path.join(dir, `compileNotificationSettings_${format(new Date(), 'yyyyMMddHHmmss')}.json`),
      JSON.stringify(result, null, 2),
    );

  }, 60000);
});
