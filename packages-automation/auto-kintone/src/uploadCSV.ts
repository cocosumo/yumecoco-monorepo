import { ElementHandle, Page } from 'puppeteer';
import { selectors as loginSels, login } from './login';
import { selectEncoding } from './selectEncoding';
import { kintoneBaseUrl } from 'api-kintone';

const timeout = 600000;

export const selectors = {
  inputFile: 'input[type=file]',
  btnUploadFile: '#fileKey-browse',
  btnImport: '#import-uploadForm-gaia:not([disabled])',
  headerYes: '.input-radio-item-cybozu > input',
};


export const goToImportPage = async (page: Page, appId: string) => {
  const baseUrl = process.env.KT_BASE_URL;
  if (!baseUrl) throw new Error('process.env.KINTONE_BASE_URL is undefined.');

  const uploadUrl = `${kintoneBaseUrl}/k/${appId}/importRecord`;

  console.log('navigation waiting', uploadUrl);

  await page.goto(uploadUrl, { waitUntil: 'domcontentloaded' });

  console.log('navigation successfull');

  const btnLogin = (await page.$(loginSels.btnLogin));
  if (btnLogin) {
    await login(page);
  }

  console.log('login successfull');


  await page.waitForSelector(
    '.button-submit-cybozu.button-disabled-cybozu',
    { timeout },
  )
    .catch((err) => {
      throw new Error('Failed to navigate to import page. ' + err.message);
    });
};


export const attachFile = async (page: Page, filePath: string) => {
  console.log('function attachFile started');
  await page.waitForSelector(selectors.inputFile, { timeout });
  const inputUploadHandle = await page.$(selectors.inputFile) as ElementHandle<HTMLInputElement>;

  await inputUploadHandle?.uploadFile(filePath);
  console.log('attach File successful');

  await page.waitForSelector(
    selectors.headerYes,
    {
      visible: true,
      timeout,
    },
  );
  console.log('wait for selector [読み込むファイルの先頭行はフィールド名ですか？]');

  await page.click(selectors.headerYes);
};

export const handleUpload = async (
  page: Page, keyField: string,
) => {
  console.log('function handleUpload started');
  await page.waitForResponse(res => res.url().includes('importRecord'));

  await selectEncoding(page, 'UTF-8'); // エンコーディング指定
  console.log('set the encoding');
  await page.waitForResponse(res => res.url().includes('importRecord'));

  console.log('wait for network idle');

  await page.waitForSelector(`input[id^='${keyField}']`, {
    visible: true,
    timeout,
  });
  console.log('wait for id field to appear');

  await page.click(`input[id^='${keyField}']`);
  console.log('click id field');

  await page.waitForSelector(selectors.btnImport, { timeout });
  console.log('wait for import button to appear');

  await page.click(selectors.btnImport);
};

/**
 * Uploads a single csv.
 * @param page
 * @param appId
 * @param keyField
 * @param file full filepath
 */
export const uploadSingleCSV = async (
  page: Page,
  appId: string,
  file: string,
  keyField = 'レコード番号',
) => {
  await goToImportPage(page, appId);
  await attachFile(page, file);
  await handleUpload(page, keyField);
};
