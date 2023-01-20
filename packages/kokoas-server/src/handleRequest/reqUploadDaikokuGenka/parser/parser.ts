
import { parseExcelSerialDate } from 'libs/src/parseExcelSerialDate';
import { ParsedDaikokuGenka } from 'types';
import xlsx from 'xlsx';
import { parseItems } from './parseItems';

/**
 * Parses the file into JSON.
 */
export const parser = async (
  wb: xlsx.WorkBook,
): Promise<ParsedDaikokuGenka> => {

  const {
    J1: { v: documentTitle },
    E5: { v: projDataId },
    Q5: { v: projName },
    L5: { v: estDataId },
    AN1: { v: printDate }, // w　は　m/d/yy になっています。
    AN2: { v: createdDate }, // w は　yy/m/d になっています。
  } = wb.Sheets['見積原価明細書'];

  /**
   * printDateとcreateDateのwは違うフォーマットになっているので、そのまま v を利用します。
   * ただ、v は　Excelのserialになているので、stringへの変換が必要。
   * 改善案あれば、お願いします。
   */

  /* 合計欄は最終ページにある */
  const lastSheetName = wb.SheetNames.at(-1);
  if (!lastSheetName) throw new Error('最終シート名の取得が失敗しました。');
  const {
    A47: { v: totalAmountBeforeTax },
    I45: { v: taxRate },
    I47: { v: totalTaxAmount },
    P47: { v: totalAmountAfterTax },
    W47: { v: totalCostPrice },
    AD47: { v: totalProfit },
    AK47: { v: overallProfitRate },
  } = wb.Sheets[lastSheetName];

  return {
    documentTitle,
    projDataId,
    projName,
    estDataId,
    printDate: parseExcelSerialDate(printDate),
    createdDate: parseExcelSerialDate(createdDate),
    totalAmountAfterTax: +totalAmountAfterTax,
    taxRate: +((taxRate as string).replace(/[^0-9]/g, '')), // セルの元値 = "消費税 ( 10% )"
    totalTaxAmount: +totalTaxAmount,
    totalCostPrice: +totalCostPrice,
    totalBeforeAfterTax: +totalAmountBeforeTax,
    totalProfit: +totalProfit,
    overallProfitRate: +((overallProfitRate as string).replace(/[^0-9.]/g, '')), // セルの元値 = "##.#%"
    items: parseItems(wb),
  };

};