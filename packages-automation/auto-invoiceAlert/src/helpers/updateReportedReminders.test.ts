import { describe, it } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { InvoiceReminder } from '../../types/InvoiceReminder';
import { updateReportedReminders } from './updateReportedReminders';
import { IInvoiceReminder } from '../../config';


describe('updateReportedReminders', () => {
  it('updateReportedReminders', async () => {

    // set output file of convertReminderToJson.test.ts
    const invoiceAlertPath = path.join(__dirname, './__TEST__/convertReminderToJson.json');
    const reminderDat = JSON.parse(fs.readFileSync(invoiceAlertPath, 'utf8')) as InvoiceReminder[];

    // set output file of getInvoiceRemindersByAlertDate.test.ts
    const invReminderPath = path.join(__dirname, '../api-kintone/__TEST__/reminders.json');
    const alertReminder = JSON.parse(fs.readFileSync(invReminderPath, 'utf8')) as IInvoiceReminder[];

    await updateReportedReminders({
      reportedReminder: reminderDat,
      existedReminder: alertReminder,
    });

    console.log('kintoneアプリでテスト結果を確認してください');
  }, 60000);

});
