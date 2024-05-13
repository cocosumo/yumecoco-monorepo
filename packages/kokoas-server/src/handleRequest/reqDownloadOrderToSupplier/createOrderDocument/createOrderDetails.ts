import { drawText } from 'kokoas-server/src/api/docusign/contracts/helpers/pdf';
import { PDFFont, PDFPage, rgb } from 'pdf-lib';
import { OrderDetails } from 'types/src/common/order';
import { chkStrLength } from '../helper/chkStrLength';
import { Big } from 'big.js';

export const createOrderDetails = (
  orderDetails: OrderDetails[],
  tgtPage: PDFPage,
  font: PDFFont,
  isFirstPage: boolean,
  startI: number,
  maxI: number,
) => {
  for (let i = startI; i < maxI; i++) {
    const posOffset = 14.9 * (i - startI);
    const posYTop = isFirstPage ? 334 : 517;
    const posY = posYTop - posOffset;

    // 番号
    drawText(
      tgtPage,
      (i + 1).toString(),
      {
        x: -10,
        y: posY,
        font: font,
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
        font: font,
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
        font: font,
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
        font: font,
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
        font: font,
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
        font: font,
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
        font: font,
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
        font: font,
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
        font: font,
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
        font: font,
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


  }

};
