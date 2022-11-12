import { headFullBrowserPage } from 'auto-common';
import { login } from './login';

describe('login', () => {
  it('should login to kintone', async () => {
    const page = await headFullBrowserPage();
    await login(page);

    await page.browser().close();
  });
});