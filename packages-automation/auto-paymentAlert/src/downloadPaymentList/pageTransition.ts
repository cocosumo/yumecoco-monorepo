import { andpaPaymentListURL } from 'config';
import { Page } from 'puppeteer';
import * as puppeteer from 'puppeteer';

const selectors = {
  buttonText: 'Excel出力',
};


export const pageTransition = async (page: Page) => {
  console.log('start payment list download process at', page.url());

  await page.goto(andpaPaymentListURL, { waitUntil: 'domcontentloaded' });

  // ページ内から「Excel出力」という文字列を探してクリックする
  const link = (await page.evaluateHandle(() =>
    Array.from(document.querySelectorAll('a')).find((el) =>
      el?.textContent?.includes('Excel出力')))) as puppeteer.ElementHandle;

  if (link) {
    await link.click();
  } else {
    console.log('リンクが見つかりませんでした');
  }


  // Excelの保存場所とファイル名を指定する


};