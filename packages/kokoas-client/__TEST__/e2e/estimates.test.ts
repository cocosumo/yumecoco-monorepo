import { headFullBrowser } from 'auto-common';
import { login } from 'auto-kintone';
import { getKokoasBaseURLByEnv } from 'kokoas-client/src/config/settings';
import { pages } from 'kokoas-client/src/pages/Router';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { Page } from 'puppeteer';
import { getEstimateById } from 'api-kintone';

/* 見積を取得 */
describe('estimates', () => {

  let page: Page;

  beforeAll(async () => {
    const browser = await headFullBrowser();
    page =  await browser.newPage();
    return page;
  });

  it('should load existing estimate correctly', async () => {
    const link = getKokoasBaseURLByEnv() + pages.projEstimate;

    const testData =  '76'; 

    await page.goto(
      `${link}?${generateParams({
        projEstimateId: testData,
      })}`,
      { waitUntil: 'domcontentloaded' },
    );

    await login(page);


    expect(page.url()).toContain(`projEstimateId=${testData}`);
    
    const { calculated: { totalAmountInclTax } } = await getEstimateById(testData);

    await page.waitForNetworkIdle();
    const rawTotalAmount = await page.$eval('table tbody td:nth-child(6)', (el) => (el as HTMLTableCellElement).innerText);

    // \D regex metacharacter matches any non-digit characters 
    const cleanTotalAmount = rawTotalAmount.replace(/\D/g, '');

    console.log(cleanTotalAmount, totalAmountInclTax);
    //expect(totalAmountInclTax).toEqual(cleanTotalAmount);

  });

  afterAll(async () => page.browser().close());
});