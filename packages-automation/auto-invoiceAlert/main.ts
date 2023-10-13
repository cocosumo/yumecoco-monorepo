import cron from 'node-cron';
import { invoiceReminder } from './src/invoiceReminder';



/**
 * Update the kintone payment reminder app.
 *
 * At 12:00 every day
 */
cron.schedule('0 0 12 * * *', () => invoiceReminder());