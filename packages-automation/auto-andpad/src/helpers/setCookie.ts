import { Page } from 'puppeteer';
import { cookiePath } from '../../config';
import fs from 'fs';
import { login } from '../login/login';

export const setCookie = async (page: Page, forceLogin = false) => {

  if (!fs.existsSync(cookiePath) || forceLogin) {
    console.log('No cookie found, or trying to login');
    await login(page);
  }

  const oldCookie = fs.readFileSync(cookiePath, 'utf8');
  
  await page.setCookie(...JSON.parse(oldCookie));
  
};