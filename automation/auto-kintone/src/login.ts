import { Page } from 'puppeteer';
import { kintoneBaseUrl } from 'api-kintone';
import { setFieldValue } from 'auto-common';

const selectors = {
  user: '[name="username"]',
  pass: '[name="password"]',
  btnLogin: '.login-button',
};

export const login = async (page: Page) => {
  console.log('Login started at ', page.url(), !page.url().includes('login'));

  /**
   * Login page contains the kintone's base URL AND "login" in the url 
   */
  if (!page.url().includes('login') && page.url().includes(kintoneBaseUrl)) {
    console.log('Already logged in.');
    return;
  }

  const auth = process.env.KT_LOGIN_AUTH;
  if (!auth) throw new Error('process.env.KT_LOGIN_AUTH is undefined.');

  const [username, password] = atob(auth).split(':');

  if (page.url().includes('about:blank')) {
    /* Fresh instance of the browser */
    await page.goto(kintoneBaseUrl, { waitUntil: 'domcontentloaded' });
  }

  await page.waitForSelector(selectors.btnLogin);

  await setFieldValue({
    page,
    selector: selectors.user,
    newValue: username,
  });
  await setFieldValue({
    page,
    selector: selectors.pass,
    newValue: password,
  });

  await Promise.all([page.waitForNavigation(), page.click(selectors.btnLogin)]);
};
