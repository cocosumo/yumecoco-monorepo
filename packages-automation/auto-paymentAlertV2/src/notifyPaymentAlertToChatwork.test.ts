import { describe, it/* , expect */ } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { notifyPaymentAlertToChatwork } from './notifyPaymentAlertToChatwork';
import { PaymentReminder } from '../types/paymentReminder';


describe('notifyPaymentAlertToChatwork', () => {
  it('should alert chatwork', async () => {


    // set output file of createPaymentAlertFromAPPayments.test.ts
    const contractsPath = path.join(__dirname, './__TEST__/createPaymentAlertFromAPPayments.json');
    const reminderDat = JSON.parse(fs.readFileSync(contractsPath, 'utf8')) as PaymentReminder[];

    await notifyPaymentAlertToChatwork({
      reminderJson: reminderDat,
    });

    console.log('結果をchatworkで確認してください');

  });
});
