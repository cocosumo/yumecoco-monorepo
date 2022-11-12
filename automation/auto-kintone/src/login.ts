import { Page } from 'puppeteer';
import { kintoneBaseUrl } from 'api-kintone';

export const login = async (page: Page) => {
  await page.goto(kintoneBaseUrl);
};