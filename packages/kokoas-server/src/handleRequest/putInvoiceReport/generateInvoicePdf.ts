import { getFilePath, getFont } from 'kokoas-server/src/assets';
import { ParsedInvoiceReport } from 'types';
import fs from 'fs/promises';
import fontkit from '@pdf-lib/fontkit';
import { PDFDocument } from 'pdf-lib';


/**
 * 請求書作成(PDF)
 * @param invoiceDat getInvoiceByIdの取得データから成形
 */
export const generateInvoicePdf = async (
  invoiceDat: ParsedInvoiceReport,
) => {

  const {
    // billingAmount,
    // custGroupId,
    // issuedDateTime,
    // plannedPaymentDate,
    slipNumber,
    // estimateLists,
  } = invoiceDat;


  const pdfPath = getFilePath({
    fileName: '請求書',
    fileType: 'pdf',
  });
  const existingPdfBytes = await fs.readFile(pdfPath);
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  const fontData = await fs.readFile(getFont());
  pdfDoc.registerFontkit(fontkit);
  const msMinchoFont = await pdfDoc.embedFont(fontData, { subset: true });

  const pages = pdfDoc.getPages();
  const firstPage = pages[0];


  console.log(`Number of pages: ${pdfDoc.getPages().length}`);
  console.log('firstPage', firstPage);


  // PDF書き込み処理 ここから TODO

  // 請求書番号
  firstPage.drawText(
    slipNumber,
    {
      x: 10, // dummy値
      y: 10, // dummy値
      font: msMinchoFont,
      size: 10,
    },
  );


  // PDF書き込み処理 ここまで



  /* test用のコード　ここから */
  // const pdfBytes = await pdfDoc.save(); // pdfデータをバイナリで取得
  /* test用のコード　ここまで */

  // return pdfBytes;
  return pdfDoc.saveAsBase64();
};