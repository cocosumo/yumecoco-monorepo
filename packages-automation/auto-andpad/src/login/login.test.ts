import { getPageFromBrowser, headFullBrowser } from 'auto-common';
import { login } from './login';
import { expect, describe, it } from '@jest/globals';

const loginRoutine = async () => {
  const browser = await headFullBrowser();
  try {
    const page = await getPageFromBrowser(browser);

    await login(page);

    expect(page.url().includes('login')).toEqual(false);
   
  } catch (e) {
    console.error(e);
  } finally {

    // cleanup
    await browser.close();
  }
};

describe('login', () => {
  it('should login to andpad', async () => {

    await loginRoutine();

  }, 100000);
  it('should stress test login to andpad', async () => {

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

  }
  , 100000);

});