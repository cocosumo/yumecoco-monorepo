import { describe, it/* , expect */ } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { notifyInvoiceAlertToChatwork } from './notifyInvoiceAlertToChatwork';
import { InvoiceReminder } from '../types/InvoiceReminder';


describe('notifyInvoiceAlertToChatwork', () => {
  it('should alert chatwork', async () => {


    // set output file of createInvoiceAlert.test.ts
    const contractsPath = path.join(__dirname, './__TEST__/createInvoiceAlert.json');
    const reminderDat = JSON.parse(fs.readFileSync(contractsPath, 'utf8')) as InvoiceReminder[];

    await notifyInvoiceAlertToChatwork({
      reminderJson: reminderDat,
    });


  });
});
