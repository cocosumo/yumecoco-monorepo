import { Browser } from 'puppeteer';

/**
 * 
 * @param browser 
 * @returns Get the first available page from the browser, or create a new one if none are available.
 * 
 * Make sure that UIPATH plugin is disabled as it creates a hidden page that is not accessible.
 */
export const getPageFromBrowser = async (browser: Browser) => {
  const pages = await browser.pages();

  return pages.length > 0 ? pages[0] : browser.newPage();
};