import { Page } from 'puppeteer';

async function getIdOfElementByText(page: Page, text: string) {
  return page.$$eval(
    'div[role="menuitemradio"]', (options, passedText) => {
      for (const option of options) {
        if (option.textContent?.includes(passedText)) {
          return option.id;
        }
      }
    }, text,
  );
}


export const selectEncoding = async (
  page: Page,
  encoding: 'UTF-8' | 'Shift-JIS' | 'Latin-1',
) => {
  
  await page.click('#importFileCharset-gaia');

  const optionId = await getIdOfElementByText(page, encoding);

  if (!optionId) throw new Error(`Encoding ${encoding} not found`);
  
  // use puppeteer's click so that it will wait for the element to be visible
  await page.click(`#\\${optionId}`); // escape the id because it contains a colon
};