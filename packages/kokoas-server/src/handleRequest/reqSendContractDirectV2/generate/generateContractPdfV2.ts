import { grayscale, PDFDocument } from 'pdf-lib';
import fs from 'fs/promises';
import fontkit from '@pdf-lib/fontkit';
import { drawText } from '../../../api/docusign/contracts/helpers/pdf';
import { format, parseISO } from 'date-fns';
import { getFilePath, getFont } from 'kokoas-server/src/assets';
import { getPayMethodX } from '../../../api/docusign/contracts/construction/helpers/getPayMethodX';
import { getContractDataV2 } from 'kokoas-server/src/handleRequest/reqSendContractDirectV2/getContractDataV2';
import { ukeoiContractVersion } from 'config';

// サービス工事
const serviceProjTypeId = '3b450da3-19fe-45bd-2406-3ded7f44fe86';

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
  ukeoiDocVersion = ukeoiContractVersion,
) => {
  const {
    //storeName,
    storeNameShort,
    customers,
    cocoAG,
    contractId,
    projName,
    projLocation,
    projectLocationData,
    projTypeId,

    dataId,
    tax,
    totalTaxAmount,
    totalContractAmtAfterTax,
    totalContractAmtBeforeTax,

    /* 支払い */
    payments,


    startDate,
    finishDate,
    deliveryDate,
    contractDate,
    payDestination,
    payMethod,

    isAdditionalContract,

    /* 会社情報 */
    companyAddress,
    //companyAddress2,
    companyName,
    //companyTel,
    representative,
  } = contractData;

  const {
    name: officerName,
  } = cocoAG?.[0] ?? {};

  const isServiceProj = serviceProjTypeId === projTypeId;

  const pdfPath = getFilePath({
    fileName: '請負契約書',
    version: ukeoiDocVersion,
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
    `${storeNameShort} ${dataId.slice(4) ?? ''}`,
    {
      x: x1,
      y: 775,
      font: msChinoFont,
    },
  );

  // 契約番号
  drawText(
    firstPage,
    contractId,
    {
      x: 50,
      y: 45,
      font: msChinoFont,
      size: 8,
      color: grayscale(0.5),
    },
    { weight: 0.1 },
  );

  // 工事名 上
  drawText(
    firstPage,
    projName,
    {
      x: x1 + 100,
      y: 775,
      font: msChinoFont,
    },
    {
      boxWidth: 280,
      isAutoSize: true,
    },
  );

  
  // 見出し
  drawText(
    firstPage,
    `工事請負契約書${isAdditionalContract ? '（追加工事）' : ''}`,
    {
      x: 0,
      y: 700,
      font: msChinoFont,
      size: 18,
    },
    {
      boxWidth: firstPage.getWidth(),
      isAutoSize: true,
      align: 'center',
      weight: 0.5,

    },
  );


  // 顧客名
  drawText(
    firstPage,
    customers.map(({ custName }) => `${custName} ` ).join('、'),
    {
      x: x1,
      y: 673,
      font: msChinoFont,
    },
  );

  // 工事名 2
  drawText(
    firstPage,
    projName,
    {
      x: x1,
      y: 615,
      font: msChinoFont,
    },
    {
      boxWidth: 300,
      isAutoSize: true,
    },
  );

  const projLocationMaxLength = 65;
  let parsedProjectLocation = projLocation;
  if (projLocation.length > projLocationMaxLength) {
    const {
      postal: projPostalCode,
      address1: projAddress1,
      address2: projAddress2,
    } = projectLocationData;

    parsedProjectLocation = `〒${projPostalCode} ${projAddress1}\n${projAddress2}`;
  }

  /** 工事場所 */
  drawText(
    firstPage,
    parsedProjectLocation,
    {
      x: x2,
      y: 586,
      font: msChinoFont,
    }, 
    {
      boxWidth: 370,
      isAutoSize: true,
    },
  );



  /* 工期：着手 */
  const projDatesX = 239;
  drawText(
    firstPage,
    startDate ? format(parseISO(startDate), 'yyyy年MM月dd日') : '-',
    {
      x: projDatesX,
      y: 571,
      font: msChinoFont,
    },
    {
      weight: 0.1,
      boxWidth: 102,
      align: 'center',
    },
  );

  /* 工期：完成 */
  drawText(
    firstPage,
    finishDate ? format(parseISO(finishDate), 'yyyy年MM月dd日') : '-',
    {
      x: projDatesX,
      y: 557,
      font: msChinoFont,
    },
    {
      weight: 0.3,
      boxWidth: 102,
      align: 'center',
    },
  );

  /* 引渡しの時期、完成の日 */
  drawText(
    firstPage,
    deliveryDate ? format(parseISO(deliveryDate), 'yyyy年MM月dd日') : '-',
    {
      x: projDatesX,
      y: 544,
      font: msChinoFont,
    },
    {
      weight: 0.1,
      boxWidth: 102,
      align: 'center',
    },
  );

  /* 請負代金金額 */
  drawText(
    firstPage,
    `￥ ${Math.round(totalContractAmtAfterTax || 0).toLocaleString()}`,
    {
      x: 211,
      y: 529,
      size: 12,
      font: msChinoFont,
    },
    {
      weight: 1,
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
      y: 515,
      size: 10,
      font: msChinoFont,
    },
    {
      weight: 0.1,
      boxWidth: 200,
      align: 'right',
    },
  );


  /* 税率 */
  const taxX = 214;
  const taxY = 501;
  drawText(
    firstPage,
    `(${tax} %)`,
    {
      x: taxX,
      y: taxY,
      size: 10,
      font: msChinoFont,
    },
    {
      weight: 0.1,
    },
  );

  /* 税額 */
  drawText(
    firstPage,
    `￥ ${Math.round(totalTaxAmount || 0).toLocaleString()}`,
    {
      x: taxX,
      y: taxY,
      size: 10,
      font: msChinoFont,
    },
    {
      weight: 0.1,
      boxWidth: 200,
      align: 'right',
    },
  );

  /* 支払い */
  const payLineHeight = 14;
  const payYBase = 457.5;
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
        size: 11,
      },
      {
        weight: 0.4,
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
  const payMethodY = 390;
  firstPage.drawCircle({
    x: getPayMethodX(payMethod),
    y: payMethodY,
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
        y: payMethodY - 2, // 
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
    contractDate ? format(parseISO(contractDate), 'yyyy年MM月dd日') : '---',
    {
      x: x1,
      y: 273,
      font: msChinoFont,
      size: 9,
    },
    {
      weight: 0.1,
    },
  );
  
  // 顧客住所
  drawText(
    firstPage,
    customers[0].address,
    {
      x: x2,
      y: 260,
      size: 9,
      font: msChinoFont,
    }, {
      weight: 0.1,
    },
  );
  
  // 印の位置
  const signWidth = 240;
  const signGap = signWidth / customers.length;
  const signY = 229;
  customers.forEach((cust, idx) => {
    const signX = x2 + (signGap * idx);
  
    drawText(
      firstPage,
      isServiceProj ? '' : '署名',
      {
        x: signX,
        y: signY,
        font: msChinoFont,
        size: 8,
        color: grayscale(0.7), // 白に近い色
      },
      {
        weight: 0.1,
      },
    );

    if (isServiceProj) {
      drawText(
        firstPage,
        `株式会社　夢のおてつだい　　${storeNameShort}`,
        {
          x: signX + 20,
          y: signY,
          font: msChinoFont,
        },
        {
          weight: 0.1,
        },
      );

    } else {
      drawText(
        firstPage,
        `c${idx + 1}`,
        {
          x: signX + 40,
          y: signY,
          font: msChinoFont,
          color: grayscale(0.96), // 白に近い色
        },
        {
          weight: 0.1,
        },
      );
    }

  });


  /// 会社情報

  const companyX = x2;
  const companyY = 657;
  const companyY2 = 201;
  const companyLH = payLineHeight; // 行の高さ。 今支払いとあわせていますが、変わる可能性

  // 会社名　上
  drawText(
    firstPage,
    companyName,
    {
      x: companyX,
      y: companyY,
      font: msChinoFont,
    },
  );

  // 会社住所 上
  drawText(
    firstPage,
    companyAddress,
    {
      x: companyX,
      y: companyY - companyLH,
      font: msChinoFont,
    },
  );

  // 会社名　下
  drawText(
    firstPage,
    companyAddress,
    {
      x: companyX,
      y: companyY2,
      font: msChinoFont,
    },
  );

  // 会社名 下
  drawText(
    firstPage,
    companyName,
    {
      x: companyX,
      y: companyY2 - companyLH,
      font: msChinoFont,
    },
  );

  // 代表者名 上
  drawText(
    firstPage,
    representative,
    {
      x: companyX,
      y: companyY - (companyLH * 2),
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

  // 担当者名
  drawText(
    firstPage,
    officerName,
    {
      x: x2,
      y: 158,
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
