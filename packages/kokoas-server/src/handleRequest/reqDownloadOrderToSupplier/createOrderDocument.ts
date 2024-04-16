import { getTemplate } from 'api-aws/src/s3/getTemplate';
import { PDFDocument, rgb } from 'pdf-lib';
import { OrderData } from 'types/src/common/order';
import fontkit from '@pdf-lib/fontkit';
import fs from 'fs/promises';
import { getFilePath, getFont } from 'kokoas-server/src/assets';
import { drawText } from 'kokoas-server/src/api/docusign/contracts/helpers/pdf';
import { getConstPeriod } from './helper/getConstPeriod';



const isTest = true;

/** 
 * 発注書を作成する
 * 
 * テンプレートはAWSから取得する
 * 返り値の型は (PDF: Base64) とする
 */
export const createOrderDocument = async (
  data: OrderData,
  contentType: 'base64' | 'Uint8Array' = 'base64',
) => {

  const {
    orderId,
    purchaseOrderId,
    orderDate,

    projId,
    projNum,
    projNumJa,
    projName,
    custGroupName,
    constAddress,
    constStartDate,
    constFinishDate,
    cocoConst,

    companyName,
    store,
    storeAddress,
    storeTel,
    storeFax,
    buildingLicenseNumber,

    vendorAddress1,
    vendorAddress2,
    vendorManeger,
  } = data;


  let template;
  const templateName = '工事依頼書_20240401.pdf';
  if (!isTest) {

    console.log('template from S3');
    template = await getTemplate(templateName);

    console.log('templateS3', template);

  } else {

    console.log('template from local');

    const pdfPath = getFilePath({
      fileName: '工事依頼書',
      fileType: 'pdf',
      version: '20240401',
    });
    template = await fs.readFile(pdfPath);

    console.log('templateLocal', template);
  }


  if (!template) throw new Error(`${templateName}が取得できませんでした。`);


  const pdfDoc = await PDFDocument.load(template);
  pdfDoc.registerFontkit(fontkit);
  const fontData = await fs.readFile(getFont());

  const msChinoFont = await pdfDoc.embedFont(fontData, { subset: true });
  const pages = pdfDoc.getPages();

  const firstPage = pages[0];


  // 発注番号
  drawText(
    firstPage,
    purchaseOrderId,
    {
      x: 700,
      y: 524,
      font: msChinoFont,
      size: 9,
    },
    {
      weight: 0.1,
    },
  );

  // 工事担当者
  drawText(
    firstPage,
    cocoConst,
    {
      x: 700,
      y: 534,
      font: msChinoFont,
      size: 9,
    },
    {
      weight: 0.1,
    },
  );

  // 発注書発行日
  drawText(
    firstPage,
    orderDate,
    {
      x: 700,
      y: 545,
      font: msChinoFont,
      size: 9,
    },
    {
      weight: 0.1,
    },
  );


  // 業者住所
  drawText(
    firstPage,
    vendorAddress1,
    {
      x: 80,
      y: 502,
      font: msChinoFont,
      size: 9,
    },
    {
      weight: 0.1,
    },
  );

  drawText(
    firstPage,
    vendorAddress2,
    {
      x: 80,
      y: 487,
      font: msChinoFont,
      size: 9,
    },
    {
      weight: 0.1,
    },
  );

  // 業者担当者
  drawText(
    firstPage,
    `${vendorManeger}　　御中`,
    {
      x: 80,
      y: 465,
      font: msChinoFont,
      size: 9,
    },
    {
      weight: 0.1,
    },
  );


  // 工事名([工事番号]　工事名)
  drawText(
    firstPage,
    `[${projNumJa}] ${projName}`,
    {
      x: 100,
      y: 392,
      font: msChinoFont,
      size: 10,
    },
    {
      weight: 0.1,
    },
  );

  // 工事場所住所
  drawText(
    firstPage,
    constAddress,
    {
      x: 100,
      y: 379,
      font: msChinoFont,
      size: 10,
    },
    {
      weight: 0.1,
    },
  );

  // 工事期間
  const constPeriod = getConstPeriod({
    startDate: constStartDate,
    finishDate: constFinishDate,
  });
  drawText(
    firstPage,
    `${constPeriod}`,
    {
      x: 100,
      y: 367,
      font: msChinoFont,
      size: 10,
    },
    {
      weight: 0.1,
    },
  );





  switch (contentType) {
    case 'base64':

      return pdfDoc.saveAsBase64();
    case 'Uint8Array':
    default:
      return pdfDoc.save();
  }
};
