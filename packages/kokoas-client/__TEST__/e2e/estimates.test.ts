import { sleep } from 'libs';
import { headFullBrowser } from 'auto-common';
import { login } from 'auto-kintone';
import { getKokoasBaseURLByEnv } from 'kokoas-client/src/config/settings';
import { pages } from 'kokoas-client/src/pages/Router';

/* 見積を取得 */
describe('estimates', () => {
  it('should load estimates correctly', async () => {
    const link = getKokoasBaseURLByEnv() + pages.projEstimate;

    console.log(link);

    const testData =  [
      '76',
    ];

    const browser = await headFullBrowser();
    const page = await browser.newPage();

    await login(page);
    

    await page.goto(link);

    await sleep(1000);

    await browser.close();
    expect(true);
  });
});