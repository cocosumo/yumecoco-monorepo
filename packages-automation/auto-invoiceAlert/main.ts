import cron from 'node-cron';
import { invoiceReminder } from './src/invoiceReminder';



/**
 * send invoice alerts.
 *
 * At 12:00 every day
 */
cron.schedule('0 0 12 * * *', () => invoiceReminder());