
import puppeteer from 'puppeteer';

export const browser = (
  options ?: Parameters<typeof puppeteer.launch>[0],
) => puppeteer.launch(options);


/* Wrappers */
export const headFullBrowser = () => browser({
  headless: false,
});
export const headFullBrowserPage = () => headFullBrowser().then(({ newPage }) => newPage);

