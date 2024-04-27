import { getTemplate } from 'api-aws/src/s3/getTemplate';
import { PDFDocument } from 'pdf-lib';
import { OrderData } from 'types/src/common/order';
import fontkit from '@pdf-lib/fontkit';
import fs from 'fs/promises';
import { getFilePath, getFont } from 'kokoas-server/src/assets';
import { drawText } from 'kokoas-server/src/api/docusign/contracts/helpers/pdf';
import { getConstPeriod } from './helper/getConstPeriod';
import { Big } from 'big.js';
import { chkStrLength } from './helper/chkStrLength';



const isTest = false;

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
  const templateName = '工事依頼書_20240424.pdf';
  if (!isTest) {

    console.log('template from S3');
    template = await getTemplate(templateName);

    console.log('templateS3', template);

  } else {

    console.log('template from local');

    const pdfPath = getFilePath({
      fileName: '工事依頼書',
      fileType: 'pdf',
      version: '20240424',
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
  const maxPageNum = Math.ceil(orderDetails.length / 30);

  // 不要なページを削除する
  for (let i = maxPageNum; i < pages.length; i++) {
    pdfDoc.removePage(maxPageNum);
  }

  // PDFに情報転記する ここから
  for (let pageNum = 0; pageNum < maxPageNum; pageNum++) {
    const tgtPage = pages[pageNum];


    // 発注番号
    drawText(
      tgtPage,
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
      tgtPage,
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
      tgtPage,
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
      tgtPage,
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
      tgtPage,
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
      tgtPage,
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
      tgtPage,
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
      tgtPage,
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
      tgtPage,
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
      tgtPage,
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
      tgtPage,
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
      tgtPage,
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
      tgtPage,
      `登録番号：${invoiceSystemNumber}`,
      {
        x: 594,
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
      tgtPage,
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
      tgtPage,
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
      tgtPage,
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
    const maxI = pageNum >= (maxPageNum - 1) ? orderDetails.length : (pageNum + 1) * 30;
    for (let i = pageNum * 30; i < maxI; i++) {
      const posOffset = 10.3 * (i - (pageNum * 30));
      const posY = 341 - posOffset;

      // 番号
      drawText(
        tgtPage,
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
        tgtPage,
        orderDetails[i].majorItem,
        {
          x: 54,
          y: posY,
          font: msChinoFont,
          size: chkStrLength({
            text: orderDetails[i].majorItem,
            maxlen: 24,
            fontSize: 9,
          }),
        },
        {
          weight: 0.1,
        },
      );

      // 中項目
      drawText(
        tgtPage,
        orderDetails[i].middleItem,
        {
          x: 173,
          y: posY,
          font: msChinoFont,
          size: chkStrLength({
            text: orderDetails[i].middleItem,
            maxlen: 24,
            fontSize: 9,
          }),
        },
        {
          weight: 0.1,
        },
      );

      // 部材
      drawText(
        tgtPage,
        orderDetails[i].material,
        {
          x: 291,
          y: posY,
          font: msChinoFont,
          size: chkStrLength({
            text: orderDetails[i].material,
            maxlen: 24,
            fontSize: 9,
          }),
        },
        {
          weight: 0.1,
        },
      );

      // 単位
      drawText(
        tgtPage,
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
      const quantity = orderDetails[i].quantity.toFixed(2);

      drawText(
        tgtPage,
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
        tgtPage,
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
        tgtPage,
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
        tgtPage,
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
        tgtPage,
        orderDetails[i].rowRemarks,
        {
          x: 707,
          y: posY,
          font: msChinoFont,
          size: chkStrLength({
            text: orderDetails[i].rowRemarks,
            maxlen: 22,
            fontSize: 9,
          }),
        },
        {
          weight: 0.1,
        },
      );


    } // 発注明細 ここまで


    // summary
    if (pageNum === maxPageNum - 1) {
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
        tgtPage,
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
        tgtPage,
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
        tgtPage,
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
    }

  } // PDFに情報転記する ここまで



  switch (contentType) {
    case 'base64':

      return pdfDoc.saveAsBase64();
    case 'Uint8Array':
    default:
      return pdfDoc.save();
  }
};
