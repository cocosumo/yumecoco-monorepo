import { Page } from 'puppeteer';
import { selectors as loginSels, login } from './login';
import { selectEncoding } from './selectEncoding';

const timeout = 600000;

export const selectors = {
  inputFile: 'input[type=file]',
  btnUploadFile: '#fileKey-browse',
  btnImport: '#import-uploadForm-gaia:not([disabled])',
  headerYes: '.input-radio-item-cybozu > input',
};


export const goToImportPage = async (page: Page, appId: string) => {
  const baseUrl = process.env.KINTONE_BASE_URL;

  console.log('★★★★★ baseUrl', baseUrl);
  const uploadUrl = `${baseUrl}/k/${appId}/importRecord`;

  await page.goto(uploadUrl);

  const btnLogin = (await page.$(loginSels.btnLogin));
  if (btnLogin) {
    await login(page);
  }

  await page.waitForSelector(
    '.button-submit-cybozu.button-disabled-cybozu',
    { timeout },
  )
    .catch((err) => {
      throw new Error('Failed to navigate to import page. ' + err.message);
    });
};

export const attachFile = async (page: Page, filePath: string) => {
  await page.waitForSelector(selectors.inputFile, { timeout });
  const inputUploadHandle = await page.$(selectors.inputFile);

  await inputUploadHandle?.uploadFile(filePath);

  await page.waitForSelector(
    selectors.headerYes,
    {
      visible: true,
      timeout,
    },
  );

  await page.click(selectors.headerYes);
};

export const handleUpload = async (
  page: Page, keyField: string,
) => {
  await page.waitForNetworkIdle();
  await page.waitForSelector(`input[id^='${keyField}']`, {
    visible: true,
    timeout,
  });
  await page.click(`input[id^='${keyField}']`);

  await page.waitForSelector(selectors.btnImport, { timeout });

  await selectEncoding(page, 'UTF-8'); // エンコーディング指定

  //  await page.click(selectors.btnImport);
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
