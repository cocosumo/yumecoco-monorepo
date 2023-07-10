import { describe, it } from '@jest/globals';
import { connectToBrowserPage } from 'auto-common/src/connectToBrowserPage';
import { selectEncoding } from './selectEncoding';


describe(('Select Encoding'), () => {
  it('should select encoding', async () => {
    const {
      browser,
      page,
    } = await connectToBrowserPage();
    
    await selectEncoding(page, 'UTF-8');

    browser.disconnect();
  }, 10000);
});