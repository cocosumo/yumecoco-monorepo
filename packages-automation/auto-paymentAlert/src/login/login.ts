
import { andpadURL, loginURL } from 'config';
import { Page } from 'puppeteer';

/* const selectors = {
  user: '[name="username"]',
  pass: '[name="password"]',
  btnLogin: '.login-button',
}; */

export const login = async (page: Page) => {
  console.log('Andpad login started at ', page.url(), !page.url().includes('login'));

  /**
   * Login page contains the "login" in the url 
   */
  if (!page.url().includes('login') && page.url().includes(andpadURL)) {
    console.log('Already logged in.');
    return;
  }

  const userId = process.env.ANDPAD_USER_ID;
  if (!userId) throw new Error('process.env.ANDPAD_USER_ID is undefined.');

  const userPass = process.env.ANDPAD_USER_PASS;
  if (!userPass) throw new Error('process.env.ANDPAD_USER_PASS is undefined.');

  if (page.url().includes('about:blank')) {
    /* Fresh instance of the browser */
    await page.goto(loginURL, { waitUntil: 'domcontentloaded' });
  }

  console.log('!!!!! check point !!!!!');

  /* await page.waitForSelector(selectors.btnLogin);

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

  await Promise.all([page.waitForNavigation(), page.click(selectors.btnLogin)]); */


};