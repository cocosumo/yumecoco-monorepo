import { Page } from 'puppeteer';
import { kintoneBaseUrl } from 'api-kintone';

export const login = async (page: Page) => {

  const auth = process.env.KT_LOGIN_AUTH;
  if (!auth) throw new Error('process.env.KT_LOGIN_AUTH is undefined.');

  

  await page.goto(kintoneBaseUrl, { waitUntil: 'domcontentloaded' });


};