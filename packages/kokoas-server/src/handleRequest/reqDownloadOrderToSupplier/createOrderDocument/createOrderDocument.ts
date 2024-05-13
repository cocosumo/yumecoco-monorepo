import { getTemplate } from 'api-aws/src/s3/getTemplate';
import { PDFDocument } from 'pdf-lib';
import { OrderData } from 'types/src/common/order';
import fontkit from '@pdf-lib/fontkit';
import fs from 'fs/promises';
import { getFilePath, getFont } from 'kokoas-server/src/assets';
import { drawText } from 'kokoas-server/src/api/docusign/contracts/helpers/pdf';
import { Big } from 'big.js';
import { createOrderHeader } from './createOrderHeader';
import { createOrderDetails } from './createOrderDetails';



const isTest = false;
const maxPageTempNum = 3;


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
  const templateName = hasOrderContract ? '工事依頼書請負書_20240513.pdf' : '工事依頼書_20240513.pdf';
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
  if (maxPageTempNum > maxPageNum) {
    if (hasOrderContract) {
      // 工事依頼書の不要ページを削除
      for (let i = maxPageNum; i < maxPageTempNum; i++) {
        pdfDoc.removePage(maxPageNum);
      }

      // 工事依頼請書の不要ページを削除
      const lastPage = maxPageNum * 2;
      for (let i = lastPage; i < maxPageTempNum + maxPageNum; i++) {        
        pdfDoc.removePage(lastPage);
      }
    } else {
      for (let i = maxPageNum; i < pages.length; i++) {
        pdfDoc.removePage(maxPageNum);
      }
    }
  }


  // PDFに情報転記する ここから
  for (let pageNum = 0; pageNum < maxPageNum; pageNum++) {
    const tgtPage = pages[pageNum];
    const isFirstPage = pageNum === 0;
    const isLastPage = pageNum >= maxPageNum - 1;


    if (isFirstPage) {
      // 1枚目のみに記載する情報の反映
      createOrderHeader(data, tgtPage, msChinoFont);
      if (!isLastPage) {
        // ページ番号
        drawText(
          tgtPage,
          `${pageNum + 1} / ${maxPageNum}`,
          {
            x: 790,
            y: 570,
            font: msChinoFont,
            size: 9,
          },
          {
            weight: 0.1,
          },
        );
      }
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

      // ページ番号
      drawText(
        tgtPage,
        `${pageNum + 1} / ${maxPageNum}`,
        {
          x: 790,
          y: 570,
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


    createOrderDetails(orderDetails, tgtPage, msChinoFont, isFirstPage, startI, maxI);

    // summary
    if (!isLastPage) {
      const pageTotal = orderDetails.reduce((acc, {
        taxRate,
        orderAmountBeforeTax,
      }, idx) => {
        if (idx < startI || maxI <= idx) return acc;

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
        pageTotal.subtotal.toLocaleString(),
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
