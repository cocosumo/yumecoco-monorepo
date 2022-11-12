import puppeteer from 'puppeteer';
import { kintoneBaseUrl } from 'api-kintone';
import { sleep } from 'libs';
import { login,  } from 'auto-kintone';

/* 見積を取得 */
describe('estimates', () => {
  it('should load estimates', async () => {

    const browser = headF

    const testData =  [
      '76',
    ];

    

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    console.log('Navigating to ', kintoneBaseUrl);

    await page.goto(kintoneBaseUrl);

    await sleep(1000);

    await browser.close();
    expect(true);
  });
});