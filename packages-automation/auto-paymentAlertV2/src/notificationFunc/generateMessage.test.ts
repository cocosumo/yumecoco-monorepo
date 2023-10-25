import { describe, it } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { generateMessage } from './generateMessage';
import { PaymentReminder } from '../../types/paymentReminder';


describe('generateMessage', () => {
  it('should generate chatwork message', async () => {

    // set output file of createPaymentAlert.test.ts
    const paymentAlertPath = path.join(__dirname, '../__TEST__/createPaymentAlert.json');
    const reminderDat = JSON.parse(fs.readFileSync(paymentAlertPath, 'utf8')) as PaymentReminder[];

    const result = await generateMessage(reminderDat[0]);

    console.log('message::', result);

  }, 60000);
});
