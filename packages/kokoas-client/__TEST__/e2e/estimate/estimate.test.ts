import { browser } from 'auto-common';
import { login } from 'auto-kintone';
import { getKokoasBaseURLByEnv } from 'kokoas-client/src/config/settings';
import { pages } from 'kokoas-client/src/pages/Router';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { Page } from 'puppeteer';
import { getEstimateById, calculateEstimateRecord } from 'api-kintone';

/* 見積を取得 */
describe('estimates', () => {
  const baseUrl = getKokoasBaseURLByEnv() + pages.projEstimate;
  let page: Page;

  beforeAll(async () => {
    const newBrowser = await browser();
    page =  (await newBrowser.pages())[0];

    return page;
  });
  afterAll(async () => page.browser().close());

  /* 存在している見積もり番号をURLで渡し、正しいデータを表示する。 */
  it('should display record from existing estimate id passed by url parameters', async () => {
    const testData =  '76'; // 存在している見積番号

    const urlWithParams = `${baseUrl}?${generateParams({
      projEstimateId: testData,
    })}`;


    await page.goto(
      urlWithParams,
      { waitUntil: 'domcontentloaded' },
    );

    await login(page);

    expect(page.url()).toContain(`projEstimateId=${testData}`);

    const record = await getEstimateById(testData);
    const { estimateSummary: { totalAmountAfterTax } } = calculateEstimateRecord({ record });

    await page.waitForNetworkIdle();
    const rawTotalAmount = await page.$eval('table tbody td:nth-child(6)', (el) => (el as HTMLTableCellElement).innerText);

    // \D regex metacharacter matches any non-digit characters
    const cleanTotalAmount = rawTotalAmount.replace(/\D/g, '');

    expect(cleanTotalAmount).toEqual(totalAmountAfterTax);
  });


  /* 存在していない見積もり番号をURLで渡し、エラーを表示する。 */
  it('should notify user of error when non-existent projEstimateId was passed by url', async () => {
    const testData =  '987654321'; // 存在していない見積番号
    const urlWithParams = `${baseUrl}?${generateParams({
      projEstimateId: testData,
    })}`;
    await page.goto(
      urlWithParams,
      { waitUntil: 'domcontentloaded' },
    );
    await login(page);
    expect(page.url()).toContain(`projEstimateId=${testData}`);

    await page.waitForNetworkIdle();

    const errorNotif = await page.waitForSelector('.MuiAlert-filledError');

    expect(errorNotif).toBeTruthy();
  });


});