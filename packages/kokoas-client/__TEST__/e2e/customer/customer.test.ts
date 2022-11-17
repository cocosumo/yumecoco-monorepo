import { browser } from 'auto-common';
import { Page } from 'puppeteer';
import { getKokoasBaseURLByEnv } from 'kokoas-client/src/config/settings';
import { pages } from 'kokoas-client/src/pages/Router';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { login } from 'auto-kintone';
import { ICustgroups } from 'types';
import { getCustGroupById, getProjsByCustGroupId } from 'api-kintone';

describe('customers', () => {
  const testData = '183'; // 存在している顧客グループ番号
  const baseUrl = getKokoasBaseURLByEnv() + pages.custGroupReg;
  let custGroupRec: ICustgroups; // Test against this record
  let page: Page;

  beforeAll(async () => {
    const newBrowser = await browser();
    page =  (await newBrowser.pages())[0];

    const urlWithParams = `${baseUrl}?${generateParams({
      custGroupId: testData,
    })}`;

    await page.goto(
      urlWithParams,
      { waitUntil: 'domcontentloaded' },
    );

    await login(page);
    await page.waitForNetworkIdle();

    /* Set actual data to test against */
    custGroupRec = await getCustGroupById(testData);
    return page;
  });
  afterAll(async () => page.browser().close());

  // URLの引数が合っているおこと
  it('should have correct url parameter', async () => {
    expect(page.url()).toContain(`custGroupId=${testData}`);
  });

  // 表示の店舗が合っているおこと
  it('should show correct store', async () => {
    const {
      storeName,
      storeId,
    } = custGroupRec;

    const viewStoreName = await page.$eval('#mui-component-select-store', (el) => (el as HTMLDivElement).innerText);
    const viewStoreId = await page.$eval('input[name=store]', (el) => (el as HTMLInputElement).value);

    console.log('storeId: ', viewStoreId, storeId.value );
    expect(viewStoreId).toEqual(storeId.value);

    console.log('storeName: ', viewStoreName,  storeName.value );
    expect(viewStoreName).toContain(storeName.value);
  });

  // 顧客名が合っていること
  it('should show correct customers', async () => {
    const {
      members,
    } = custGroupRec;

    /* 画面から顧客名を取得する */
    const viewCustNames = await page.$$eval(
      'input[name$="custName"]',
      (els) => (els as HTMLInputElement[]).map(el => el.value),
    );

    /* DBから顧客名を取得する */
    const custNames = members.value.map(({ value: { customerName } }) => customerName.value);

    console.log('custNames: ', viewCustNames, custNames);
    expect(viewCustNames).toEqual(custNames);

  });

  it('should show correct related projects', async () => {

    /* DBから顧客名を取得する */
    const projIds = await getProjsByCustGroupId(testData)
      .then((recs) => recs.map(({ $id }) => $id.value));

    /* 画面から顧客番号を取得する */
    const viewProjIds = await page.$$eval(
      'div[id^="projId"] p',
      (els) => (els as HTMLDivElement[]).map(el => el.innerText),
    );

    console.log('projIds: ', viewProjIds, projIds);
    expect(viewProjIds).toEqual(projIds);
  });
});