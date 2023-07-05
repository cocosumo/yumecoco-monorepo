import { connectToBrowser } from './connectToBrowser';
import { getPageFromBrowser } from './getPageFromBrowser';

/**
 * A convenience function to connect to a browser and get the first available page.
 * Wrapper for connectToBrowser and getPageFromBrowser.
 */
export const connectToBrowserPage = async () => {
  const browser = await connectToBrowser();
  const page = await getPageFromBrowser(browser);
  return {
    page,
    browser, 
  };
};