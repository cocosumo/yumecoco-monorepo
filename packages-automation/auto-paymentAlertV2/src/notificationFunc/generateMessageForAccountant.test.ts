import { describe, it, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { PaymentReminder } from '../../types/paymentReminder';
import { generateMessageForAccountant } from './generateMessageForAccountant';


describe('generateMessageForAccountant', () => {
  it('should generate chatwork message', () => {

    // set output file of createPaymentAlertFromAPPayments.test.ts
    const paymentAlertPath = path.join(__dirname, '../__TEST__/createPaymentAlertFromAPPayments.json');
    const reminderDat = JSON.parse(fs.readFileSync(paymentAlertPath, 'utf8')) as PaymentReminder[];

    const result = generateMessageForAccountant(reminderDat);

    console.log('message::', result);
    console.log('messege length::', result.length);

    expect(result.length).toBeGreaterThan(0);

  }, 60000);
});
