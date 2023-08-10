import { Page } from 'puppeteer';
import { cookiePath } from '../../config';
import fs from 'fs';
import { login } from '../login/login';

export const setCookie = async (page: Page, forceLogin = false) => {

  if (!fs.existsSync(cookiePath) || forceLogin) {
    await login(page);
  }

  const oldCookie = fs.readFileSync(cookiePath, 'utf8');
  
  await page.setCookie(...JSON.parse(oldCookie));
  
};