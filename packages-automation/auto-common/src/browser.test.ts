import { describe, it } from '@jest/globals';
import { sleep } from 'libs';
import { headFullBrowser } from './browser';


describe('Open Browser', () => {
  it('should open browser', async () => {
    const browser = await headFullBrowser();
    const page = await browser.newPage();

    await page.goto('https://www.google.com');
    
    console.log('Connected. Disconnecting in 5 seconds...');

    await sleep(5000);
    
    browser.close();
  }, 10000);
});