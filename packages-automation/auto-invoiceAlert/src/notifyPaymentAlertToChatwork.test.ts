import { describe, it/* , expect */ } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { notifyPaymentAlertToChatwork } from './notifyPaymentAlertToChatwork';
import { InvoiceReminder } from '../types/InvoiceReminder';


describe('notifyPaymentAlertToChatwork', () => {
  it('should alert chatwork', async () => {


    // set output file of createPaymentAlert.test.ts
    const contractsPath = path.join(__dirname, './__TEST__/createPaymentAlert.json');
    const reminderDat = JSON.parse(fs.readFileSync(contractsPath, 'utf8')) as InvoiceReminder[];

    await notifyPaymentAlertToChatwork({
      reminderJson: reminderDat,
    });


  });
});
