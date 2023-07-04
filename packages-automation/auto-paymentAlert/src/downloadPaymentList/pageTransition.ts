import { setSelectValue } from 'auto-common/src/setSelectValue';
import { andpaPaymentListURL } from 'config';
import { Page } from 'puppeteer';
import * as puppeteer from 'puppeteer';

const selectors = {
  buttonText: 'Excel出力',
  depositMonth: '#q_planned_date_start',
  targetMonth: '全ての入金月',
};


export const pageTransition = async (page: Page) => {
  console.log('start payment list download process at', page.url());

  await page.goto(andpaPaymentListURL, { waitUntil: 'domcontentloaded' });

  // 表示対象を全入金月に変更する
  await setSelectValue({
    page,
    selector: selectors.depositMonth,
    newValue: selectors.targetMonth,
  });

  const search = (await page.evaluateHandle(() =>
    Array.from(document.querySelectorAll('a')).find((el) =>
      el?.textContent?.includes('検索')))) as puppeteer.ElementHandle;

  if (search) {
    await Promise.all([search.click(), page.waitForNavigation()]);
  } else {
    console.log('検索ボタンが見つかりませんでした');
  }

  
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