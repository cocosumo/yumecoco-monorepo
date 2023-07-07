import { ElementHandle, Page } from 'puppeteer';

async function clickElementWithText(page: Page, text: string) {
  console.log('Text', text);
  return page.$$eval(
    'div[role="menuitemradio"]', (options, passedText) => {
      for (const option of options) {
        console.log('option', option.textContent);
        if (option.textContent?.includes(passedText)) {
          option.click();
          return option;
        }
      }
    }, text,
  );
}


export const selectEncoding = async (
  page: Page,
  encoding: string,
) => {
  
  await page.click('#importFileCharset-gaia');

  const optionToClick = await clickElementWithText(page, encoding);

  if (!optionToClick) throw new Error(`Encoding ${encoding} not found`);

  //optionToClick.click();
  
};