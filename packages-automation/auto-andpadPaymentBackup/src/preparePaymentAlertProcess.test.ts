import { describe, it } from '@jest/globals';
import { connectToBrowserPage } from 'auto-common/src/connectToBrowserPage';
import { preparePaymentAlertProcess } from './preparePaymentAlertProcess';
import { getPageFromBrowser, headFullBrowser } from 'auto-common';

describe('test', () => {
  it('should be process on remote browser', async () => {
    const {
      page,
      browser,
    } = await connectToBrowserPage();

    try {
      await preparePaymentAlertProcess(page);
    } catch  (e) {
      console.log(e);
    } finally {
      browser.disconnect();
    }

  }, 60000);

  it('should process on a new browser instance', async () => {
    const browser = await headFullBrowser();
    const page = await getPageFromBrowser(browser);

    try {
      await preparePaymentAlertProcess(page);
    } catch  (e) {
      console.log(e);
    } finally {
      await browser.close();
    }
  }, 60000);
});