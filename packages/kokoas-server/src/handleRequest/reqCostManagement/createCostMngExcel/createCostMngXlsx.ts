import Excel from 'exceljs';
import { getFilePath } from 'kokoas-server/src/assets';
import path from 'path';
import { GetCostMgtData } from 'types';
import { initCostMngWorksheet } from './initCostMngWorksheet';
import { Big } from 'big.js';
import { createOrderAmountPerMonth } from './createOrderAmountPerMonth';
import { format, lastDayOfMonth } from 'date-fns';


const dateFormat = (isoStringDate: string) => {

  const isoDate = new Date(isoStringDate);
  return format(lastDayOfMonth(isoDate), 'yyyy.MM.dd');
};

/**
 * 案件の原価見積もりから工事別原価管理表を作成します
 * @param costManagement 原価見積もりの整形済みデータ
 */
export const createCostMngXlsx = async (costManagement: GetCostMgtData) => {

  const costMngFilePath = getFilePath({
    fileName: '原価見積',
    fileType: 'xlsx',
  });

  // Read excel file.
  let workbook = new Excel.Workbook();
  workbook = await workbook.xlsx.readFile(costMngFilePath);

  // 月ごとの発注額合計計算要のobjを準備する
  const orderAmountPerMonth = createOrderAmountPerMonth(costManagement.maxPaymentDate, costManagement.minPaymentDate);
  const tgtMonthList = Object.keys(orderAmountPerMonth);

  // excelファイル書き込み処理
  const maxRows = 15;
  const rowOffset = 13; // 14行目から開始
  const columnOffset = 3; // 4列目(D列)から開始

  let currRowIdx = 1;
  let currSheetIdx = 1;
  let wsName = '原価管理表';

  let ws = initCostMngWorksheet(wsName, workbook, costManagement);
  let rowIdx = currRowIdx + rowOffset;

  for (const procurement of costManagement.発注情報詳細) {
    if (currRowIdx > maxRows) {
      // 次のシートへ
      currRowIdx = 1;
      wsName = `原価管理表 (${++currSheetIdx})`;
      ws = initCostMngWorksheet(wsName, workbook, costManagement);
    }

    rowIdx = currRowIdx + rowOffset;
    // 発注先情報の反映
    ws.getCell(`A${rowIdx}`).value = currRowIdx;
    ws.getCell(`B${rowIdx}`).value = procurement.supplierName;
    ws.getCell(`C${rowIdx}`).value = procurement.orderAmountBeforeTax;

    // 支払い実績の反映
    for (const paymentHistory of procurement.paymentHistory) {
      const tgtMonth = dateFormat(paymentHistory.paymentDate ?? '');

      orderAmountPerMonth[tgtMonth] = {
        ...orderAmountPerMonth[tgtMonth],
        orderAmtTgtMonth: Big(orderAmountPerMonth[tgtMonth].orderAmtTgtMonth).plus(paymentHistory.paymentAmountBeforeTax)
          .toNumber(),
      };

      const arrayIndex = tgtMonthList.indexOf(tgtMonth);
      const columnIndex = columnOffset + (arrayIndex * 4) + 1;

      ws.getCell(rowIdx, columnIndex).value = tgtMonth;
      ws.getCell(rowIdx, columnIndex + 2).value = paymentHistory.paymentAmountBeforeTax;
    }


    currRowIdx++; // 次の行へ
  }


  // 合計欄の記入
  rowIdx = 39;
  ws.getCell(`C${rowIdx}`).value = costManagement.発注金額_税抜;
  ws.getCell(`AB${rowIdx}`).value = costManagement.発注金額_税抜 - costManagement.支払金額_税抜;

  Object.values(orderAmountPerMonth).forEach((orderAmount, index) => {
    const columnIndex = columnOffset + 3 + (index * 4);
    ws.getCell(rowIdx, columnIndex).value = orderAmount.orderAmtTgtMonth;
  });


  // 余ったシートを削除
  while (workbook.getWorksheet(`原価管理表 (${++currSheetIdx})`)) {
    workbook.removeWorksheet(`原価管理表 (${currSheetIdx})`);
  }

  // 発注詳細
  const savePath = path.join(__dirname, `../__TEMP__/原価見積_${costManagement.projNum}.xlsx`);
  await workbook.xlsx.writeFile(savePath);
};
