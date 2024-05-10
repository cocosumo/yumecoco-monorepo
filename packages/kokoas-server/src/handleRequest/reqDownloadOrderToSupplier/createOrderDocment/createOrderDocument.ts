import { getTemplate } from 'api-aws/src/s3/getTemplate';
import { PDFDocument, rgb } from 'pdf-lib';
import { OrderData } from 'types/src/common/order';
import fontkit from '@pdf-lib/fontkit';
import fs from 'fs/promises';
import { getFilePath, getFont } from 'kokoas-server/src/assets';
import { drawText } from 'kokoas-server/src/api/docusign/contracts/helpers/pdf';
import { Big } from 'big.js';
import { chkStrLength } from '../helper/chkStrLength';
import { createOrderHeader } from './createOrderHeader';



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
  hasOrderContract: boolean = true,
) => {

  const {
    purchaseOrderId,
    projNumJa,
    projName,
    orderDetails,
  } = data;


  let template;
  const templateName = hasOrderContract ? '工事依頼書請負書_20240510.pdf' : '工事依頼書_20240424.pdf';
  if (!isTest) {

    console.log('template from S3');
    template = await getTemplate(templateName);

    // console.log('templateS3', template);

  } else {

    console.log('template from local');

    if (templateName) {
      const pdfPath = getFilePath({
        fileName: '工事依頼書請負書',
        fileType: 'pdf',
        version: '20240510',
      });
      template = await fs.readFile(pdfPath);

    } else {
      const pdfPath = getFilePath({
        fileName: '工事依頼書',
        fileType: 'pdf',
        version: '20240424',
      });
      template = await fs.readFile(pdfPath);

    }

    console.log('templateLocal', template);
  }


  if (!template) throw new Error(`${templateName}が取得できませんでした。`);


  const pdfDoc = await PDFDocument.load(template);
  pdfDoc.registerFontkit(fontkit);
  const fontData = await fs.readFile(getFont());

  const msChinoFont = await pdfDoc.embedFont(fontData, { subset: true });
  const pages = pdfDoc.getPages();

  const rowNumFirstPage = 20;
  const rowNumSecondPageAfter = 32;
  const maxPageNum = orderDetails.length <= rowNumFirstPage ? 1
    : Math.ceil((orderDetails.length - rowNumFirstPage) / rowNumSecondPageAfter) + 1;


  // 不要なページを削除する
  for (let i = maxPageNum; i < pages.length; i++) {
    pdfDoc.removePage(maxPageNum);
  }


  // PDFに情報転記する ここから
  for (let pageNum = 0; pageNum < maxPageNum; pageNum++) {
    const tgtPage = pages[pageNum];
    const isFirstPage = pageNum === 0;
    const isLastPage = pageNum >= maxPageNum - 1;


    if (isFirstPage) {
      // 1枚目のみに記載する情報の反映
      createOrderHeader(data, tgtPage, msChinoFont);
    } else {
      // 2枚目以降に記載する情報
      // 発注番号
      drawText(
        tgtPage,
        purchaseOrderId,
        {
          x: 695,
          y: 550,
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
          x: 90,
          y: 550,
          font: msChinoFont,
          size: 9,
        },
        {
          weight: 0.1,
        },
      );

    }


    // 発注明細の反映 明細行数分繰り返す
    const rowNum = isFirstPage ? rowNumFirstPage : rowNumSecondPageAfter;
    const startI = isFirstPage ? 0 : 20 + (pageNum - 1) * rowNum;
    const maxI = isLastPage ? orderDetails.length : startI + rowNum;


    for (let i = startI; i < maxI; i++) {
      const posOffset = 14.9 * (i - startI);
      const posYTop = isFirstPage ? 334 : 517;
      const posY = posYTop - posOffset;

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
        quantity,
        {
          x: 388,
          y: posY,
          font: msChinoFont,
          size: 9,
          color: orderDetails[i].quantity >= 0 ? rgb(0, 0, 0) : rgb(1, 0, 0),
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
          color: orderDetails[i].costPrice >= 0 ? rgb(0, 0, 0) : rgb(1, 0, 0),
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
          color: orderDetails[i].orderAmountBeforeTax >= 0 ? rgb(0, 0, 0) : rgb(1, 0, 0),
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
    if (!isLastPage) {
      const pageTotal = orderDetails.reduce((acc, {
        taxRate,
        orderAmountBeforeTax,
      }, idx) => {
        if (idx < startI || maxI < idx) return acc;

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
      pageTotal.taxAmount = Big(pageTotal.taxableSubtotal).mul(pageTotal.taxRate)
        .toNumber();
      pageTotal.totalAmount = Big(pageTotal.subtotal).plus(pageTotal.taxAmount)
        .toNumber();

      const pageTotalPosY = isFirstPage ? 20 : 25;

      // ページ計(ラベル)
      drawText(
        tgtPage,
        'ページ計',
        {
          x: 700,
          y: pageTotalPosY,
          font: msChinoFont,
        },
        {
          weight: 0.1,
        },
      );

      // ページ計
      drawText(
        tgtPage,
        pageTotal.totalAmount.toLocaleString(),
        {
          x: 707,
          y: pageTotalPosY,
          font: msChinoFont,
        },
        {
          weight: 0.1,
          align: 'right',
        },
      );

    } else {
      const summaryPosY = isFirstPage ? 36 : 40;
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
