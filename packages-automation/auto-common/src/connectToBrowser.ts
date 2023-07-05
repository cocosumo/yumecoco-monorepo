import puppeteer from 'puppeteer';
import { mockBrowserUrl } from '../config';

/**
 * Connect to a browser instance.
 * ※ Must add following parameters to the browser's shortcut:
 *      chromium-browser --remote-debugging-port=9222
 * 
 * @returns A puppeteer browser instance connected to the mock browser.
 */
export const connectToBrowser = async () => {
  return puppeteer.connect({
    browserURL: mockBrowserUrl,
    defaultViewport: null,
  });
};