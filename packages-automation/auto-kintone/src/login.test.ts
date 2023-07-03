import { headFullBrowser } from 'auto-common';
import { login } from './login';
import { expect, describe, it } from '@jest/globals';

describe('login', () => {
  it('should login to kintone', async () => {
    const browser = await headFullBrowser();
    const page = await browser.newPage();

    await login(page);

    expect(page.url().includes('login')).toEqual(false);

    await page.browser().close();
  });
});