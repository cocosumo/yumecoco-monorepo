
import { loginURL } from 'config';
import { Page } from 'puppeteer';
import { saveCookie } from '../helpers/saveCookie';


const selectors = {
  btnWinMove: '.button_main',
  user: '#email',
  pass: '#password',
  btnLogin: '#btn-login',
};

export const login = async (page: Page) => {
  try {

    const userId = process.env.ANDPAD_USER_ID;
    if (!userId) throw new Error('process.env.ANDPAD_USER_ID is undefined.');

    const userPass = process.env.ANDPAD_USER_PASS;
    if (!userPass) throw new Error('process.env.ANDPAD_USER_PASS is undefined.');

    console.log('Current URL:', page.url());
    if (!page.url().includes('login')) {
      console.log('Navigating to initial login page...', loginURL);
      /* Fresh instance of the browser */
      await page.goto(loginURL, { waitUntil: 'domcontentloaded' });

      console.log('Clicking navigate to login button...');
      await Promise.all([
        page.waitForNavigation({ timeout: 10000 }),
        page.click(selectors.btnWinMove),
      ]);
    } else {
      console.log('Already on initial login page..clicking navigate to login button.');
      await page.click(selectors.btnWinMove);
    }

    console.log('Waiting for login page to load...');
    await page.waitForSelector(selectors.user);

    console.log('Typing login details...');
    await page.type(selectors.user, userId, { delay: 10 });
    await page.type(selectors.pass, userPass, { delay: 10 });

    console.log('Finding login button...');
    await page.waitForSelector(selectors.btnLogin);
    await page.click(selectors.btnLogin);

    await page.waitForNavigation({ timeout: 20000, waitUntil: 'load' });
    /*     console.log('Clicking login button...');
    await Promise.all([
      page.waitForNavigation({ timeout: 20000, waitUntil: 'load' }),
    ]);
 */
    console.log('Login completed');

    await saveCookie(page);

  } catch (e) {
    console.error('Login failed', e);
    throw e;
  }
  
};