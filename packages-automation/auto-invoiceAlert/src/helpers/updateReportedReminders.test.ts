import { describe, it } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { InvoiceReminder } from '../../types/InvoiceReminder';
import { updateReportedReminders } from './updateReportedReminders';
import { getInvoiceRemindersByAlertDate } from '../api-kintone';


describe('updateReportedReminders', () => {
  it('updateReportedReminders', async () => {

    // set output file of createInvoiceAlert.test.ts
    const invoiceAlertPath = path.join(__dirname, '../__TEST__/createInvoiceAlert.json');
    const reminderDat = JSON.parse(fs.readFileSync(invoiceAlertPath, 'utf8')) as InvoiceReminder[];

    const alertReminder = await getInvoiceRemindersByAlertDate(new Date());

    await updateReportedReminders({
      reportedReminder: reminderDat,
      existedReminder: alertReminder,
    });

    console.log('kintoneアプリでテスト結果を確認してください');
  }, 60000);

});
