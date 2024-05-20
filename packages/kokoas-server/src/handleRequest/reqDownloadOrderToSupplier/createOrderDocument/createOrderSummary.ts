import { OrderData } from 'types/src/common/order';
import { PDFFont, PDFPage } from 'pdf-lib';
import { drawText } from 'kokoas-server/src/api/docusign/contracts/helpers/pdf';
import { Big } from 'big.js';



export const createOrderSummary = ({
  orderData,
  tgtPage,
  font,
  isFirstPage,
  isLastPage,
  startI,
  maxI,
}: {
  orderData: OrderData,
  tgtPage: PDFPage,
  font: PDFFont,
  isFirstPage: boolean,
  isLastPage: boolean,
  startI: number,
  maxI: number,
}) => {

  const {
    orderDetails,
  } = orderData;

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
        font: font,
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
        font: font,
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
        font: font,
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
        font: font,
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
        font: font,
        size: 9,
      },
      {
        weight: 0.1,
        align: 'right',
      },
    );
  }

};
