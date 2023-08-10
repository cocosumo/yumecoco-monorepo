
import { andpadURL, loginURL } from 'config';
import { Page } from 'puppeteer';

const selectors = {
  btnWinMove: '.button_main',
  user: '#email',
  pass: '#password',
  btnLogin: '#btn-login',
};

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

  await Promise.all([
    page.waitForNavigation({ timeout: 5000 }),
    page.click(selectors.btnWinMove),
  ]);

  await page.waitForSelector(selectors.user);

  await page.type(selectors.user, userId);
  await page.type(selectors.pass, userPass);

  await Promise.all([
    page.waitForNavigation({ timeout: 5000, waitUntil: 'load' }),
    page.click(selectors.btnLogin),
  ]);

  console.log('Login completed');
};