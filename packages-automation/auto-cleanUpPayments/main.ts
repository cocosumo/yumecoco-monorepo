import { cleanupAndpadPayments } from './cleanUpAndpadPayments';


import cron from 'node-cron';
/**
 * Diff sync andpad payment list to kintone.
 *
 * Runs every day at 11:02
 */
cron.schedule('2 11 * * *', () => cleanupAndpadPayments());
