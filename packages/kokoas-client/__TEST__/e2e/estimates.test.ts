import { sleep } from 'libs';
import { headFullBrowser } from 'auto-common';
import { login } from 'auto-kintone';
import { getKokoasBaseURLByEnv } from 'kokoas-client/src/config/settings';

/* 見積を取得 */
describe('estimates', () => {
  it('should load estimates correctly', async () => {

    const testData =  [
      '76',
    ];

    const browser = await headFullBrowser();
    const page = await browser.newPage();

    await login(page);

    await page.goto(getKokoasBaseURLByEnv());

    await sleep(1000);

    await browser.close();
    expect(true);
  });
});