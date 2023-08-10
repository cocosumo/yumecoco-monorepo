import { getPageFromBrowser, headFullBrowser } from 'auto-common';
import { login } from './login';
import { expect, describe, it } from '@jest/globals';

const loginRoutine = async () => {
  const browser = await headFullBrowser();
  const page = await getPageFromBrowser(browser);

  await login(page);

  expect(page.url().includes('login')).toEqual(false);

  await page.browser().close();
};

describe('login', () => {
  it('should login to andpad', async () => {

    // open 10 pages at once
    await Promise.all([
      loginRoutine(),
      loginRoutine(),
      loginRoutine(),
      loginRoutine(),
      loginRoutine(),
      loginRoutine(),
      loginRoutine(),
      loginRoutine(),
      loginRoutine(),
      loginRoutine(),
    ]);


  }, 100000);
});