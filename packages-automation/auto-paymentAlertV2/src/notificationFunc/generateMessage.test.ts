import { describe, it, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { generateMessage } from './generateMessage';
import { PaymentReminder } from '../../types/paymentReminder';


describe('generateMessage', () => {
  it('should generate chatwork message', () => {

    // set output file of createPaymentAlertFromAPPayments.test.ts
    const paymentAlertPath = path.join(__dirname, '../__TEST__/createPaymentAlertFromAPPayments.json');
    const reminderDat = JSON.parse(fs.readFileSync(paymentAlertPath, 'utf8')) as PaymentReminder[];

    const result = generateMessage(reminderDat[0]);

    console.log('message::', result);

    expect(result.includes('お客さまからの入金が確認できていません')).toBeTruthy();

  }, 60000);
});
