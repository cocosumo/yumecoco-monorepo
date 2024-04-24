import { getTemplate } from 'api-aws/src/s3/getTemplate';
import { PDFDocument } from 'pdf-lib';
import { OrderData } from 'types/src/common/order';
import fontkit from '@pdf-lib/fontkit';
import fs from 'fs/promises';
import { getFilePath, getFont } from 'kokoas-server/src/assets';
import { drawText } from 'kokoas-server/src/api/docusign/contracts/helpers/pdf';
import { getConstPeriod } from './helper/getConstPeriod';
import { Big } from 'big.js';



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
    //orderId,
    purchaseOrderId,
    orderDate,

    //projId,
    //projNum,
    projNumJa,
    projName,
    //custGroupName,
    constAddress,
    constStartDate,
    constFinishDate,
    cocoConst,

    companyName,
    store,
    postCode,
    storeAddress,
    storeTel,
    storeFax,
    buildingLicenseNumber,
    invoiceSystemNumber,

    vendorAddress1,
    vendorAddress2,
    vendorManager1,
    vendorManager2,
    orderDetails,
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
      y: 513,
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
      y: 497,
      font: msChinoFont,
      size: 9,
    },
    {
      weight: 0.1,
    },
  );

  // 業者担当者1
  drawText(
    firstPage,
    vendorManager1,
    {
      x: 80,
      y: 478,
      font: msChinoFont,
      size: 9,
    },
    {
      weight: 0.1,
    },
  );

  // 業者担当者2
  drawText(
    firstPage,
    vendorManager2,
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


  // 会社情報
  // 会社名
  const companyNameArray = companyName.split(' ');
  drawText(
    firstPage,
    `${companyNameArray[0]} ${companyNameArray[1]}`,
    {
      x: 594,
      y: 502,
      font: msChinoFont,
      size: 12,
    },
    {
      weight: 0.4,
    },
  );

  // 会社名 2行目
  drawText(
    firstPage,
    `${companyNameArray[2]} ${store}`,
    {
      x: 594,
      y: 489,
      font: msChinoFont,
      size: 12,
    },
    {
      weight: 0.4,
    },
  );

  // 適格請求書発行事業者番号
  drawText(
    firstPage,
    invoiceSystemNumber,
    {
      x: 640,
      y: 478,
      font: msChinoFont,
      size: 9,
    },
    {
      weight: 0.1,
    },
  );

  // 郵便番号 + 住所
  drawText(
    firstPage,
    `〒${postCode} ${storeAddress}`,
    {
      x: 595,
      y: 466,
      font: msChinoFont,
      size: 9,
    },
    {
      weight: 0.1,
    },
  );

  // TEL + FAX
  drawText(
    firstPage,
    `TEL：${storeTel}  FAX：${storeFax}`,
    {
      x: 595,
      y: 454,
      font: msChinoFont,
      size: 9,
    },
    {
      weight: 0.1,
    },
  );

  // 建築業許可番号
  drawText(
    firstPage,
    buildingLicenseNumber,
    {
      x: 595,
      y: 443,
      font: msChinoFont,
      size: 9,
    },
    {
      weight: 0.1,
    },
  );


  // 発注明細の反映 明細行数分繰り返す
  for (let i = 0; i < orderDetails.length; i++) {
    const posOffset = 10.3 * i;
    const posY = 341 - posOffset;

    // 番号
    drawText(
      firstPage,
      (i + 1).toString(),
      {
        x: -10,
        y: posY,
        font: msChinoFont,
        size: 9,
      },
      {
        weight: 0.1,
        align: 'center',
      },
    );

    // 大項目
    drawText(
      firstPage,
      orderDetails[i].majorItem,
      {
        x: 54,
        y: posY,
        font: msChinoFont,
        size: 9,
      },
      {
        weight: 0.1,
      },
    );

    // 中項目
    drawText(
      firstPage,
      orderDetails[i].middleItem,
      {
        x: 173,
        y: posY,
        font: msChinoFont,
        size: 9,
      },
      {
        weight: 0.1,
      },
    );

    // 部材
    drawText(
      firstPage,
      orderDetails[i].material,
      {
        x: 291,
        y: posY,
        font: msChinoFont,
        size: 9,
      },
      {
        weight: 0.1,
      },
    );

    // 単位
    drawText(
      firstPage,
      orderDetails[i].unit,
      {
        x: 375,
        y: posY,
        font: msChinoFont,
        size: 9,
      },
      {
        weight: 0.1,
        align: 'center',
      },
    );

    // 数量
    const quentity = orderDetails[i].quantity.toFixed(2);

    drawText(
      firstPage,
      quentity,
      {
        x: 388,
        y: posY,
        font: msChinoFont,
        size: 9,
      },
      {
        weight: 0.1,
        align: 'right',
      },
    );

    // 単価
    drawText(
      firstPage,
      orderDetails[i].costPrice.toLocaleString(),
      {
        x: 458,
        y: posY,
        font: msChinoFont,
        size: 9,
      },
      {
        weight: 0.1,
        align: 'right',
      },
    );

    // 発注金額
    drawText(
      firstPage,
      orderDetails[i].orderAmountBeforeTax.toLocaleString(),
      {
        x: 552,
        y: posY,
        font: msChinoFont,
        size: 9,
      },
      {
        weight: 0.1,
        align: 'right',
      },
    );

    
    // 税区分
    const taxRate = orderDetails[i].taxRate === 0 ? '非課税' 
      : `課税(${Big(orderDetails[i].taxRate).mul(100)
        .toNumber()
        .toString()}%)`;

    drawText(
      firstPage,
      taxRate,
      {
        x: 660,
        y: posY,
        font: msChinoFont,
        size: 9,
      },
      {
        weight: 0.1,
      },
    );

    // 備考
    drawText(
      firstPage,
      orderDetails[i].rowRemarks,
      {
        x: 707,
        y: posY,
        font: msChinoFont,
        size: 9,
      },
      {
        weight: 0.1,
      },
    );


  } // 発注明細 ここまで


  // summary
  const summaryPosY = 31;
  const summary = orderDetails.reduce((acc, {
    taxRate,
    orderAmountBeforeTax,
  }) => {
    acc.subtotal += orderAmountBeforeTax;
    if (taxRate === 0) {
      acc.taxExemptSubtotal += orderAmountBeforeTax;
    } else {
      acc.taxRate = taxRate;
      acc.taxableSubtotal += orderAmountBeforeTax;
    }

    return acc;
  }, {
    subtotal: 0,
    taxableSubtotal: 0,
    taxExemptSubtotal: 0,
    taxAmount: 0,
    totalAmount: 0,
    taxRate: 0.1,
  });

  summary.taxAmount = Big(summary.taxableSubtotal).mul(summary.taxRate)
    .toNumber();
  summary.totalAmount = Big(summary.subtotal).plus(summary.taxAmount)
    .toNumber();

  // 小計
  drawText(
    firstPage,
    summary.subtotal.toLocaleString(),
    {
      x: 182,
      y: summaryPosY,
      font: msChinoFont,
      size: 9,
    },
    {
      weight: 0.1,
      align: 'right',
    },
  );

  // 消費税額
  drawText(
    firstPage,
    summary.taxAmount.toLocaleString(),
    {
      x: 388,
      y: summaryPosY,
      font: msChinoFont,
      size: 9,
    },
    {
      weight: 0.1,
      align: 'right',
    },
  );

  // 合計
  drawText(
    firstPage,
    summary.totalAmount.toLocaleString(),
    {
      x: 600,
      y: summaryPosY,
      font: msChinoFont,
      size: 9,
    },
    {
      weight: 0.1,
      align: 'right',
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
