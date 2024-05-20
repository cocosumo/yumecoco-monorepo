import { drawText } from 'kokoas-server/src/api/docusign/contracts/helpers/pdf';
import { PDFFont, PDFPage } from 'pdf-lib';
import { OrderData } from 'types/src/common/order';
import { getConstPeriod } from '../../helper/getConstPeriod';

export const createOrderContractHeader = ({
  orderData,
  tgtPage,
  font,
  isFirstPage,
  isLastPage,
  pageNum,
  maxPageNum,
}: {
  orderData: OrderData,
  tgtPage: PDFPage,
  font: PDFFont,
  isFirstPage: boolean,
  isLastPage: boolean,
  pageNum: number,
  maxPageNum: number,
}) => {

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

    companyName,
    agStore,
    postCode,
    storeAddress,

    supplierAddress1,
    supplierAddress2,
    supplierOfficer1,
    supplierOfficer2,
  } = orderData;


  if (!isFirstPage) {
    // 2枚目以降に記載する情報
    // 発注番号
    drawText(
      tgtPage,
      purchaseOrderId,
      {
        x: 695,
        y: 550,
        font: font,
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
        font: font,
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
        font: font,
        size: 9,
      },
      {
        weight: 0.1,
      },
    );
  } else {
    if (!isLastPage) {
      // ページ番号
      drawText(
        tgtPage,
        `${pageNum + 1} / ${maxPageNum}`,
        {
          x: 790,
          y: 570,
          font: font,
          size: 9,
        },
        {
          weight: 0.1,
        },
      );
    }

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

    // 発注番号
    drawText(
      tgtPage,
      purchaseOrderId,
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



    // 業者住所1
    const posXSupplier = 570;
    drawText(
      tgtPage,
      supplierAddress1,
      {
        x: posXSupplier,
        y: 487,
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
        x: posXSupplier,
        y: 473,
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
        x: posXSupplier,
        y: 452,
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
        x: posXSupplier,
        y: 438,
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
        y: 402,
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
        y: 390,
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
        y: 378,
        font: font,
        size: 9,
      },
      {
        weight: 0.1,
      },
    );



    // 会社情報    
    // 郵便番号 + 住所
    drawText(
      tgtPage,
      `〒${postCode} ${storeAddress}`,
      {
        x: 40,
        y: 500,
        font: font,
        size: 10,
      },
      {
        weight: 0.1,
      },
    );

    // 会社名
    const posXCompany = 50;
    const [companyInfo, companyMainName, companySubName] = companyName.split(' ');
    drawText(
      tgtPage,
      `${companyInfo} ${companyMainName}`,
      {
        x: posXCompany,
        y: 480,
        font: font,
        size: 10,
      },
      {
        weight: 0.1,
      },
    );

    // 会社名 2行目
    drawText(
      tgtPage,
      `${companySubName} ${agStore}`,
      {
        x: posXCompany,
        y: 465,
        font: font,
        size: 10,
      },
      {
        weight: 0.1,
      },
    );
  }
};
