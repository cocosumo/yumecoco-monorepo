
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

    
    /* Fresh instance of the browser */
    await page.goto(loginURL, { waitUntil: 'domcontentloaded' });

    await Promise.all([
      page.waitForNavigation({ timeout: 10000 }),
      page.click(selectors.btnWinMove),
    ]);

    await page.waitForSelector(selectors.user);

    await page.type(selectors.user, userId);
    await page.type(selectors.pass, userPass);

    await Promise.all([
      page.waitForNavigation({ timeout: 20000, waitUntil: 'load' }),
      page.click(selectors.btnLogin),
    ]);

    console.log('Login completed');

    await saveCookie(page);

  } catch (e) {
    console.error('Login failed', e);
    throw e;
  }
  
};