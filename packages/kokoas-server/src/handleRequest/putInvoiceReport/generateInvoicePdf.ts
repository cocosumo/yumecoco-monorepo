import { getFilePath, getFont } from 'kokoas-server/src/assets';
import { ParsedCompanyDetailsDatReport, ParsedCustGroupReport, ParsedInvoiceReport } from 'types';
import fs from 'fs/promises';
import fontkit from '@pdf-lib/fontkit';
import { PDFDocument } from 'pdf-lib';
import format from 'date-fns/format';
import { parseISO } from 'date-fns';


/**
 * 請求書作成(PDF)
 * @param invoiceDat getInvoiceByIdの取得データから成形
 */
export const generateInvoicePdf = async (
  invoiceDat: ParsedInvoiceReport,
  custGroupDat: ParsedCustGroupReport,
  companyDetailsDat: ParsedCompanyDetailsDatReport,
) => {

  const {
    billingAmount,
    issuedDateTime,
    // plannedPaymentDate,
    slipNumber,
    // estimateLists,
  } = invoiceDat;

  const {
    members,
  } = custGroupDat;

  const {
    companyName,
    // companyPostCode,
    // companyAddress,
    // kenchikugyoKyoka,
    // takkengyoNumber,
    // OfficeRegistration,
  } = companyDetailsDat;

  const custName = members[0].customerName;

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


  /* PDF書き込み処理 ここから TODO */

  // 顧客氏名 ※右揃えで設定
  const custNameFontSize = 18;  
  const custNametextWidth = msMinchoFont.widthOfTextAtSize(custName, custNameFontSize);

  firstPage.drawText(
    custName,
    {
      x: firstPage.getWidth() - custNametextWidth - 600,
      y: 522,
      font: msMinchoFont,
      size: 18,
    },
  );

  // 請求金額 ※右揃えで設定
  const newBillingAmount = billingAmount.toLocaleString();
  const billingAmountFontSize = 14;  
  const textWidth = msMinchoFont.widthOfTextAtSize(newBillingAmount, billingAmountFontSize);

  firstPage.drawText(
    newBillingAmount,
    {
      x: firstPage.getWidth() - textWidth - 600,
      y: 501,
      font: msMinchoFont,
      size: billingAmountFontSize,
    },
  );


  // 請求書番号
  firstPage.drawText(
    slipNumber,
    {
      x: 738,
      y: 459,
      font: msMinchoFont,
      size: 12,
    },
  );

  // 請求書発行日
  firstPage.drawText(
    format(parseISO(issuedDateTime), 'yyyy年MM月dd日'),
    {
      x: 738,
      y: 445,
      font: msMinchoFont,
      size: 12,
    },
  );

  // 会社情報の反映  
  firstPage.drawText(
    companyName,
    {
      x: 477,
      y: 126,
      font: msMinchoFont,
      size: 14,
    },
  );


  // PDF書き込み処理 ここまで



  /* test用のコード　ここから */
  // const pdfBytes = await pdfDoc.save(); // pdfデータをバイナリで取得
  /* test用のコード　ここまで */

  // return pdfBytes;
  return pdfDoc.saveAsBase64();
};