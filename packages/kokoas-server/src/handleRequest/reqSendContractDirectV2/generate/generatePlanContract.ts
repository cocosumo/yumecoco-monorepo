import { getTemplate } from 'api-aws/src/s3/getTemplate';
import { TContractData } from '../getContractDataV2';
import { PDFDocument } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import { getFont } from 'kokoas-server/src/assets';
import fs from 'fs/promises';
import { drawText } from 'kokoas-server/src/api/docusign/contracts/helpers/pdf';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

/**
 * 設計契約を生成する
 * 依頼 : K230
 * 
 * テンプレートはAWSから取得する
 */
export const generatePlanContract = async ( 
  contractData : TContractData,
  contentType: 'base64' | 'img' | 'Uint8Array' = 'base64',
) => {

  const {
    dataId,
    
    contractDate,
    customers,

    projName,
    projLocation,

    purpose,
    structure,
    scale,

    projPeriod,

    totalContractAmtAfterTax,
    annotation,
  } = contractData;

  const templateName = '設計契約書_20231028.03.pdf';
  const template = await getTemplate(templateName);

  if (!template) throw new Error(`${templateName}が取得できませんでした。`);


  const pdfDoc = await PDFDocument.load(template);
  pdfDoc.registerFontkit(fontkit);
  const fontData = await fs.readFile(getFont());

  const msChinoFont = await pdfDoc.embedFont(fontData, { subset: true });
  const pages = pdfDoc.getPages();

  const firstPage = pages[0];

  // 工事番号
  drawText(
    firstPage,
    `${dataId}`,
    {
      x: 490,
      y: 810,
      font: msChinoFont,
    },
    {
      weight: 0.1,
    },
  );

  // 契約日
  drawText(
    firstPage,
    contractDate ? format(parseISO(contractDate), 'yyyy年MM月dd日') : '---',
    {
      x: 490,
      y: 717,
      font: msChinoFont,
      size: 11,
    },
    {
      weight: 0.1,
    },
  );

  // 顧客名
  drawText(
    firstPage,
    customers.map(({ custName }) => `${custName} 様` ).join('、'),
    {
      x: 160,
      y: 685,
      font: msChinoFont,
    },
  );

  // 顧客住所
  drawText(
    firstPage,
    customers[0].address,
    {
      x: 160,
      y: 668,
      font: msChinoFont,
    }, {
      weight: 0.1,
    },
  );

  // 顧客連絡先
  drawText(
    firstPage,
    customers[0].contactNumber || ' -',
    {
      x: 168,
      y: 651,
      font: msChinoFont,
    }, {
      weight: 0.1,
    },
  );

  // 工事名
  drawText(
    firstPage,
    projName,
    {
      x: 152,
      y: 549,
      font: msChinoFont,
      maxWidth: 200,
    },
    {
      
      boxWidth: 403,
      isAutoSize: true,
      maxLength: 80,
    },
  );

  /** 工事場所 */
  drawText(
    firstPage,
    projLocation,
    {
      x: 152,
      y: 532,
      font: msChinoFont,
    }, 
    {
      boxWidth: 403,
      maxLength: 80,
      isAutoSize: true,
    },
  );

  /** 用途、構造、規模 */
  drawText(
    firstPage,
    `${[purpose, structure, scale].join('　')}`,
    {
      x: 152,
      y: 515,
      font: msChinoFont,
    }, 
    {
      boxWidth: 403,
      maxLength: 80,
      isAutoSize: true,
    },
  );

  // 業務の期間
  drawText(
    firstPage,
    projPeriod ? `${projPeriod}日間` : '-',
    {
      x: 265,
      y: 414,
      font: msChinoFont,
      size: 10,
    }, {
      weight: 0.1,
    },
  );

  // 契約金額
  drawText(
    firstPage,
    `${totalContractAmtAfterTax.toLocaleString()}円（税抜）`,
    {
      x: 160,
      y: 328,
      font: msChinoFont,
      size: 11,
    }, {
      weight: 0.1,
    },
  );
  
  // 注釈
  drawText(
    firstPage,
    `＊ ${annotation}`,
    {
      x: 147,
      y: 311,
      font: msChinoFont,
      size: 9,
    }, {
      weight: 0.1,
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