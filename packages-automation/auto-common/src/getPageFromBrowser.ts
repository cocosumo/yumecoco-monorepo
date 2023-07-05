import { Browser } from 'puppeteer';

/**
 * 
 * @param browser 
 * @returns Get the first available page from the browser, or create a new one if none are available.
 */
export const getPageFromBrowser = async (browser: Browser) => {
  const pages = await browser.pages();

  console.log(`Found ${pages.length} pages.`);

  return browser.newPage();
};