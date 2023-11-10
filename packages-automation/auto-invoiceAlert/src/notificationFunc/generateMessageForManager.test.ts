import { describe, it } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { InvoiceReminder } from '../../types/InvoiceReminder';
import { generateMessageForManager } from './generateMessageForManager';


describe('generateMessageForManager', () => {
  it('should generate chatwork message', async () => {

    // set output file of createInvoiceAlert.test.ts
    const invoiceAlertPath = path.join(__dirname, '../__TEST__/createInvoiceAlert.json');
    const reminderDat = JSON.parse(fs.readFileSync(invoiceAlertPath, 'utf8')) as InvoiceReminder[];

    const result = generateMessageForManager(reminderDat);

    console.log('message::', result);

  }, 60000);
});
