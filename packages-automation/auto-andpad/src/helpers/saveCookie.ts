import { Page } from 'puppeteer';
import fs from 'fs';
import { cookiePath } from '../../config';


export const saveCookie = async (page: Page) => {
  const cookies = await page.cookies();
  fs.writeFileSync(cookiePath, JSON.stringify(cookies, null, 2));
};