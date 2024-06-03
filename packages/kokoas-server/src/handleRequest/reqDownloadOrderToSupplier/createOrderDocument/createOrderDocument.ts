import { getTemplate } from 'api-aws/src/s3/getTemplate';
import { PDFDocument } from 'pdf-lib';
import { OrderData } from 'types/src/common/order';
import fontkit from '@pdf-lib/fontkit';
import fs from 'fs/promises';
import { getFilePath, getFont } from 'kokoas-server/src/assets';
import { createOrderRequestHeader } from './createOrderRequest/createOrderRequestHeader';
import { createOrderDetails } from './createOrderDetails';
import { createOrderSummary } from './createOrderSummary';
import { createOrderContractHeader } from './createOrderContract/createOrderContractHeader';



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
    orderDetails,
  } = data;


  let template;
  const templateName = hasOrderContract ? '工事依頼書請負書_20240603.pdf' : '工事依頼書_20240603.pdf';
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
        version: '20240603',
      });
      template = await fs.readFile(pdfPath);

    } else {
      const pdfPath = getFilePath({
        fileName: '工事依頼書',
        fileType: 'pdf',
        version: '20240513',
      });
      template = await fs.readFile(pdfPath);

    }

    console.log('templateLocal', template);
  }


  if (!template) throw new Error(`${templateName}が取得できませんでした。`);


  // PDF書き込み準備
  const pdfDoc = await PDFDocument.load(template);
  pdfDoc.registerFontkit(fontkit);
  const fontData = await fs.readFile(getFont());

  const msChinoFont = await pdfDoc.embedFont(fontData, { subset: true });
  const pages = pdfDoc.getPages();

  const rowNumFirstPage = 20;
  const rowNumSecondPageAfter = 32;
  let maxPageNum = orderDetails.length <= rowNumFirstPage ? 1
    : Math.ceil((orderDetails.length - rowNumFirstPage) / rowNumSecondPageAfter) + 1;


  // 不要なページを削除する
  if (maxPageTempNum >= maxPageNum) {
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
  } else {
    maxPageNum = maxPageTempNum;
  }


  // 工事依頼書を作成する ここから
  for (let pageNum = 0; pageNum < maxPageNum; pageNum++) {
    const tgtPage = pages[pageNum];
    const isFirstPage = pageNum === 0;
    const isLastPage = pageNum >= maxPageNum - 1;

    createOrderRequestHeader({
      orderData: data,
      tgtPage,
      font: msChinoFont,
      isFirstPage,
      isLastPage,
      pageNum,
      maxPageNum,
    });

    // 発注明細の反映 明細行数分繰り返す
    const rowNum = isFirstPage ? rowNumFirstPage : rowNumSecondPageAfter;
    const startI = isFirstPage ? 0 : 20 + (pageNum - 1) * rowNum;
    const maxI = isLastPage ? orderDetails.length : startI + rowNum;


    for (let i = startI; i < maxI; i++) {
      createOrderDetails({
        orderDetails: orderDetails[i],
        tgtPage,
        font: msChinoFont,
        isFirstPage,
        posOfs: (i - startI),
        rowNum: i,
      });
    }

    createOrderSummary({
      orderData: data,
      tgtPage,
      font: msChinoFont,
      isFirstPage,
      isLastPage,
      startI,
      maxI,
    });

  } // 工事依頼書を作成する ここまで

  // 工事依頼請書を作成する　ここから  
  if (hasOrderContract) {
    for (let pageNum = maxPageTempNum; pageNum < maxPageTempNum + maxPageNum; pageNum++) {
      const tgtPage = pages[pageNum];
      const isFirstPage = pageNum === maxPageTempNum;
      const isLastPage = pageNum >= maxPageTempNum + maxPageNum - 1;

      console.log('maxPageNum', maxPageNum, 'pageNum', pageNum, 'isFirstPage', isFirstPage, 'isLastPage', isLastPage);



      createOrderContractHeader({
        orderData: data,
        tgtPage,
        font: msChinoFont,
        isFirstPage,
        isLastPage,
        pageNum: pageNum - maxPageTempNum,
        maxPageNum,
      });


      // 発注明細の反映 明細行数分繰り返す
      const rowNum = isFirstPage ? rowNumFirstPage : rowNumSecondPageAfter;
      const startI = isFirstPage ? 0 : 20 + (pageNum - maxPageTempNum - 1) * rowNum;
      const maxI = isLastPage ? orderDetails.length : startI + rowNum;


      for (let i = startI; i < maxI; i++) {
        createOrderDetails({
          orderDetails: orderDetails[i],
          tgtPage,
          font: msChinoFont,
          isFirstPage,
          posOfs: (i - startI),
          rowNum: i,
        });
      }

      createOrderSummary({
        orderData: data,
        tgtPage,
        font: msChinoFont,
        isFirstPage,
        isLastPage,
        startI,
        maxI,
      });

    }
  } // 工事依頼請書を作成する　ここまで


  switch (contentType) {
    case 'base64':

      return pdfDoc.saveAsBase64();
    case 'Uint8Array':
    default:
      return pdfDoc.save();
  }
};
