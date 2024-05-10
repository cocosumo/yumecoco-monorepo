import { drawText } from 'kokoas-server/src/api/docusign/contracts/helpers/pdf';
import { PDFFont, PDFPage } from 'pdf-lib';
import { OrderData } from 'types/src/common/order';
import { getConstPeriod } from '../helper/getConstPeriod';



export const createOrderHeader = (
  orderData: OrderData,
  tgtPage: PDFPage,
  font: PDFFont,
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
    agStore,
    postCode,
    storeAddress,
    storeTel,
    storeFax,
    buildingLicenseNumber,
    invoiceSystemNumber,

    supplierAddress1,
    supplierAddress2,
    supplierOfficer1,
    supplierOfficer2,
  } = orderData;


  // 発注書発行日
  drawText(
    tgtPage,
    orderDate,
    {
      x: 700,
      y: 543,
      font: font,
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
      y: 533,
      font: font,
      size: 9,
    },
    {
      weight: 0.1,
    },
  );

  // 発注番号
  drawText(
    tgtPage,
    purchaseOrderId,
    {
      x: 700,
      y: 522,
      font: font,
      size: 9,
    },
    {
      weight: 0.1,
    },
  );



  // 業者住所1
  drawText(
    tgtPage,
    supplierAddress1,
    {
      x: 80,
      y: 512,
      font: font,
      size: 10,
    },
    {
      weight: 0.1,
    },
  );

  // 業者住所2
  drawText(
    tgtPage,
    supplierAddress2,
    {
      x: 80,
      y: 498,
      font: font,
      size: 10,
    },
    {
      weight: 0.1,
    },
  );

  // 業者担当者1
  drawText(
    tgtPage,
    supplierOfficer1,
    {
      x: 80,
      y: 476,
      font: font,
      size: 10,
    },
    {
      weight: 0.1,
    },
  );

  // 業者担当者2
  drawText(
    tgtPage,
    supplierOfficer2,
    {
      x: 80,
      y: 463,
      font: font,
      size: 10,
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
      y: 390,
      font: font,
      size: 9,
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
      y: 377,
      font: font,
      size: 9,
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
      y: 366,
      font: font,
      size: 9,
    },
    {
      weight: 0.1,
    },
  );



  // 会社情報
  // 会社名
  const [companyInfo, companyMainName, companySubName] = companyName.split(' ');
  drawText(
    tgtPage,
    `${companyInfo} ${companyMainName}`,
    {
      x: 594,
      y: 492,
      font: font,
      size: 12,
    },
    {
      weight: 0.4,
    },
  );

  // 会社名 2行目
  drawText(
    tgtPage,
    `${companySubName} ${agStore}`,
    {
      x: 594,
      y: 479,
      font: font,
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
      y: 468,
      font: font,
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
      y: 456,
      font: font,
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
      y: 444,
      font: font,
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
      y: 433,
      font: font,
      size: 9,
    },
    {
      weight: 0.1,
    },
  );
};
