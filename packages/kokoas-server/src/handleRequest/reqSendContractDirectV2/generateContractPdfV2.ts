import { grayscale, PDFDocument } from 'pdf-lib';
import fs from 'fs/promises';
import fontkit from '@pdf-lib/fontkit';
import { drawText } from '../../api/docusign/contracts/helpers/pdf';
import { format, parseISO } from 'date-fns';
import { getFilePath, getFont } from 'kokoas-server/src/assets';
import { getPayMethodX } from '../../api/docusign/contracts/construction/helpers/getPayMethodX';
import { getContractDataV2 } from 'kokoas-server/src/handleRequest/reqSendContractDirectV2/getContractDataV2';


/**
 * 請負契約書
 *
 * @param contractData derived from getContractData
 * @param contentType
 * @returns {string} base64, widely supported format.
 * @returns {Uint8Array} for efficient saving as file.
 */
export const generateContractPdfV2 = async (
  contractData : Awaited<ReturnType<typeof getContractDataV2>>,
  contentType: 'base64' | 'img' | 'Uint8Array ' = 'base64',
) => {
  const {
    
    customers,
    cocoAG,
    contractId,
    projName,
    projLocation,
    dataId,
    tax,
    totalTaxAmount,
    totalContractAmtAfterTax,
    totalContractAmtBeforeTax,

    /* 支払い */
    payments,


    startDate,
    startDaysAfterContract,
    finishDate,
    finishDaysAfterContract,
    deliveryDate,
    contractDate,
    payDestination,
    payMethod,

    /* 会社情報 */
    companyAddress,
    companyName,
    companyTel,
    representative,
  } = contractData;

  const {
    name: officerName,
  } = cocoAG?.[0] ?? {};


  const pdfPath = getFilePath({
    fileName: '請負契約書',
  });
  const existingPdfBytes = await fs.readFile(pdfPath);
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  const fontData = await fs.readFile(getFont());


  // const font = fontkit.create(fontData);
  pdfDoc.registerFontkit(fontkit);

  const msChinoFont = await pdfDoc.embedFont(fontData, { subset: true });

  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  // Common alignments
  const x1 = 130; // 工事番号
  const x2 = 190;
  const x3 = 239;


  // 工事番号
  drawText(
    firstPage,
    dataId ?? '',
    {
      x: x1,
      y: 775,
      font: msChinoFont,
    },
  );

  // 見積もり番号
  drawText(
    firstPage,
    contractId,
    {
      x: 50,
      y: 45,
      font: msChinoFont,
      size: 8,

    },
    { weight: 0.1 },
  );

  // 工事名
  drawText(
    firstPage,
    projName,
    {
      x: x1 + 100,
      y: 775,
      font: msChinoFont,
    },
  );

  // 顧客名
  drawText(
    firstPage,
    customers.map(({ custName }) => `${custName} 様` ).join('、'),
    {
      x: x1,
      y: 675,
      font: msChinoFont,
    },
  );

  // 工事名
  drawText(
    firstPage,
    projName,
    {
      x: x1,
      y: 603,
      font: msChinoFont,
    },
  );


  /**
   * Footer
   */


  // 顧客住所
  drawText(
    firstPage,
    customers[0].address,
    {
      x: x2,
      y: 240,
      size: 9,
      font: msChinoFont,
    }, {
      weight: 0.1,
    },
  );
  // drawCustAddress(customers, x2, firstPage, msChinoFont);

  // 工事場所
  drawText(
    firstPage,
    projLocation,
    {
      x: x2,
      y: 575,
      font: msChinoFont,
    },
  );

  /* 工期：着手 */
  drawText(
    firstPage,
    startDate ? format(parseISO(startDate), 'yyyy年MM月dd日') : '-',
    {
      x: 239,
      y: 563,
      font: msChinoFont,
    },
    {
      weight: 0.1,
      boxWidth: 102,
      align: 'center',
    },
  );

  /* 工期：着手の契約の日から＿＿日以内 */
  drawText(
    firstPage,
    startDaysAfterContract ? String(startDaysAfterContract) : '-',
    {
      x: 299,
      y: 548,
      font: msChinoFont,
    },
    {
      weight: 0.1,
      boxWidth: 30,
      align: 'right',
    },
  );


  /* 工期：完成 */
  drawText(
    firstPage,
    finishDate ? format(parseISO(finishDate), 'yyyy年MM月dd日') : '-',
    {
      x: 239,
      y: 535,
      font: msChinoFont,
    },
    {
      weight: 0.3,
      boxWidth: 102,
      align: 'center',
    },
  );

  /* 工期：完成の契約の日から＿＿日以内 */
  drawText(
    firstPage,
    finishDaysAfterContract ? String(finishDaysAfterContract) : '-',
    {
      x: 299,
      y: 520,
      font: msChinoFont,
    },
    {
      weight: 0.3,
      boxWidth: 30,
      align: 'right',
    },
  );

  /* 引渡しの時期、完成の日 */
  drawText(
    firstPage,
    deliveryDate ? format(parseISO(deliveryDate), 'yyyy年MM月dd日') : '-',
    {
      x: 227,
      y: 506,
      font: msChinoFont,
      size: 10,
    },
    {
      weight: 0.1,
    },
  );

  /* 請負代金金額 */
  drawText(
    firstPage,
    `￥ ${Math.round(totalContractAmtAfterTax || 0).toLocaleString()}`,
    {
      x: 211,
      y: 493,
      size: 11,
      font: msChinoFont,
    },
    {
      weight: 0.3,
      boxWidth: 218,
      align: 'center',
    },
  );

  /* うち工事価格 */
  drawText(
    firstPage,
    `￥ ${Math.round(totalContractAmtBeforeTax || 0).toLocaleString() }`,
    {
      x: 214,
      y: 479,
      size: 10,
      font: msChinoFont,
    },
    {
      weight: 0,
      boxWidth: 200,
      align: 'right',
    },
  );


  /* 税 */
  drawText(
    firstPage,
    `(${tax} %)`,
    {
      x: 214,
      y: 466,
      size: 10,
      font: msChinoFont,
    },
    {
      weight: 0,
    },
  );

  /* 税額 */
  drawText(
    firstPage,
    `￥ ${Math.round(totalTaxAmount || 0).toLocaleString()}`,
    {
      x: 214,
      y: 463,
      size: 10,
      font: msChinoFont,
    },
    {
      weight: 0,
      boxWidth: 200,
      align: 'right',
    },
  );

  /* 支払い */
  const payLineHeight = 14;
  const payYBase = 422.5;
  payments.map(({
    paymentAmt,
    paymentDate,
  }, idx) => {
    const rowY = payYBase - (idx * payLineHeight);
    const resolvePayAmt = paymentAmt ? paymentAmt.toLocaleString() : '';
    let resolvePayDate = '';

    if (resolvePayAmt && paymentDate) {
      resolvePayDate = format(parseISO(paymentDate), 'yyyy年MM月dd日');
    }

    /* 支払額 */
    drawText(
      firstPage,
      resolvePayAmt,
      {
        x: x3,
        y: rowY,
        font: msChinoFont,
      },
      {
        weight: 0.3,
        align: 'right',
      },
    );

    /* 支払い日 */
    drawText(
      firstPage,
      resolvePayDate,
      {
        x: 394,
        y: rowY,
        font: msChinoFont,
      },
      {
        weight: 0.3,
        boxWidth: 140,
        align: 'center',
      },
    );
  });

  /* 支払い方法 */
  firstPage.drawCircle({
    x: getPayMethodX(payMethod),
    y: 369,
    size: 4,
    borderWidth: 1,
    color: grayscale(0.1),
    opacity: 0.1,
  });

  if (payMethod === '振込') {
    drawText(
      firstPage,
      payDestination || '豊田信用金庫　朝日支店', // 当面、固定。頻繁に変わるなら、マスター設定に移行。
      {
        x: 380,
        y: 367,
        font: msChinoFont,
      },
      {
        weight: 0.3,
        boxWidth: 152,
        align: 'center',
      },
    );
  }

  // 契約日
  drawText(
    firstPage,
    contractDate ? format(parseISO(contractDate), 'yyyy年MM月dd日') : '',
    {
      x: x1,
      y: 255,
      font: msChinoFont,
      size: 9,
    },
    {
      weight: 0.1,
    },
  );

  // 担当者名
  drawText(
    firstPage,
    officerName,
    {
      x: x2,
      y: 154,
      font: msChinoFont,
    },
  );


  /// 会社情報

  const companyX = x2;
  const companyY = 660;
  const companyY2 = 197;
  const companyLH = payLineHeight; // 行の高さ。 今支払いとあわせていますが、変わる可能性

  [companyY, companyY2].forEach((newY) => {

    // 会社名　上下
    drawText(
      firstPage,
      companyName,
      {
        x: companyX,
        y: newY,
        font: msChinoFont,
      },
    );

    // 会社住所 上下
    drawText(
      firstPage,
      companyAddress,
      {
        x: companyX,
        y: newY - companyLH,
        font: msChinoFont,
      },
    );


  });

  // 会社連絡先 上
  drawText(
    firstPage,
    companyTel,
    {
      x: companyX,
      y: companyY - (companyLH * 2),
      font: msChinoFont,
    },
  );

  // 代表者名 上
  drawText(
    firstPage,
    representative,
    {
      x: companyX,
      y: companyY - (companyLH * 3),
      font: msChinoFont,
    },
  );

  // 代表者名　下
  drawText(
    firstPage,
    representative,
    {
      x: companyX,
      y: companyY2 - (companyLH * 2),
      font: msChinoFont,
    },
  );






  switch (contentType) {
    case 'base64':

      return pdfDoc.saveAsBase64();
    case 'Uint8Array ':
    default:
      return pdfDoc.save();
  }
};
