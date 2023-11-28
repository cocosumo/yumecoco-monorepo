import cron from 'node-cron';
import { paymentReminder } from './src/paymentReminder';


console.log('開始しました。12:00に実行されます');
/**
 * Update the kintone payment reminder app.
 *
 * At 12:00 every day
 */
cron.schedule('0 0 12 * * *', () => paymentReminder());
//paymentReminder();
