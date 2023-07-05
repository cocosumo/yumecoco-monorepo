import puppeteer from 'puppeteer';
import { mockBrowserUrl } from '../config';

/**
 * @returns A puppeteer browser instance connected to the mock browser.
 */
export const openMockBrowser = async () => {
  return puppeteer.connect({
    browserURL: mockBrowserUrl,
    defaultViewport: null,
  });
};