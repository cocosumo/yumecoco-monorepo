import { Page } from 'puppeteer';

export const setSelectValue = async (
  { page, selector, newValue }:
  { 
    page: Page, 
    selector: string, 
    newValue: string 
  },
) => {
  await page.waitForSelector(selector);
  await page.evaluate((sel, value)=>{
    const select = document
      .querySelector(sel) as HTMLSelectElement;
    if (select) {
      const options = Array.from(select.options);
      const index = options.findIndex(option => option.text === value);
      if (index !== -1) {
        select.selectedIndex = index;
      }
    }
  }, selector, newValue);
};