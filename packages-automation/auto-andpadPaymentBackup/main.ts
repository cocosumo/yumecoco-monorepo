import { preparePaymentAlert } from './src/preparePaymentAlert';

import cron from 'node-cron';
/**
 * Diff sync andpad payment list to kintone.
 *
 * At every 5 minute past
 * every hour from 8 through 22
 */
cron.schedule('*/5 8-22 * * *', () => preparePaymentAlert());