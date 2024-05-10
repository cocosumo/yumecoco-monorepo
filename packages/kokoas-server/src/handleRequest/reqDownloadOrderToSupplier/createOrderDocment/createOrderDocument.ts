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

  const rowNum = 20;
  const maxPageNum = Math.ceil(orderDetails.length / rowNum);

  // 不要なページを削除する
  for (let i = maxPageNum; i < pages.length; i++) {
    pdfDoc.removePage(maxPageNum);
  }


  // PDFに情報転記する ここから
  for (let pageNum = 0; pageNum < maxPageNum; pageNum++) {
    const tgtPage = pages[pageNum];
    const isFirstPage = pageNum === 0;

    // 1枚目のみに記載する情報の反映
    if (isFirstPage) {
      createOrderHeader(data, tgtPage, msChinoFont);
    }


    // 発注明細の反映 明細行数分繰り返す
    const maxI = pageNum >= (maxPageNum - 1) ? orderDetails.length : (pageNum + 1) * rowNum;
    for (let i = pageNum * rowNum; i < maxI; i++) {
      const posOffset =  14.9 * (i - (pageNum * rowNum));
      const posYTop = isFirstPage ? 334 : 543;
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
