import { Page } from 'puppeteer';

export const setFieldValue = async (
  { page, selector, newValue }:
  { 
    page: Page, 
    selector: string, 
    newValue: string 
  }) => {
  await page.waitForSelector(selector);
  await page.evaluate((sel, value)=>{
    const field = document
      .querySelector(sel) as HTMLInputElement;
    if (field) {
      field.value = value;
    }
  }, selector, newValue);
};