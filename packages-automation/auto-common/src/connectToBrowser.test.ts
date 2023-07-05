import { describe, it } from '@jest/globals';
import { connectToBrowser } from './connectToBrowser';
import { sleep } from 'libs';

describe('Open Mock Browser', () => {
  it('should open mock browser', async () => {
    const browser = await connectToBrowser();

    await browser
      .newPage()
      .then((page) => page.goto('https://www.google.com'));
    
    console.log('Connected. Disconnecting in 5 seconds...');

    await sleep(5000);
    
    browser.disconnect();
  }, 10000);
});
