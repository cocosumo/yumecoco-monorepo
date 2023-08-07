import Excel from 'exceljs';
import { getFilePath } from 'kokoas-server/src/assets';
import path from 'path';
import { GetCostMgtData } from 'types';
import { initCostMngWorksheet } from './initCostMngWorksheet';
import { Big } from 'big.js';



interface OrderAmountPerMonth {
  paymentDate: string
  OrderAmtTgtMonth: number
}

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
  const orderAmountPerMonth = {} as Record<string, OrderAmountPerMonth>;

  // excelファイル書き込み処理
  const maxRows = 15;
  const rowOffset = 13; // 14行目から開始

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
      const tgtMonth = paymentHistory.paymentDate?.toString() ?? '';
      if (typeof orderAmountPerMonth[tgtMonth] === 'undefined') {
        orderAmountPerMonth[tgtMonth] = {
          paymentDate: paymentHistory.paymentDate ?? '',
          OrderAmtTgtMonth: paymentHistory.paymentAmountBeforeTax,
        };
      } else {        
        orderAmountPerMonth[tgtMonth] = {
          ...orderAmountPerMonth[tgtMonth],
          OrderAmtTgtMonth: Big(orderAmountPerMonth[tgtMonth].OrderAmtTgtMonth).plus(paymentHistory.paymentAmountBeforeTax)
            .toNumber(),
        };
      }
    }


    currRowIdx++; // 次の行へ
  }

  const forDebug = Object.values(orderAmountPerMonth);


  // 合計欄の記入
  rowIdx = 39;
  ws.getCell(`C${rowIdx}`).value = costManagement.発注金額_税抜;  
  ws.getCell(`D${rowIdx}`).value = forDebug[0].paymentDate; // forDebug
  ws.getCell(`F${rowIdx}`).value = forDebug[0].OrderAmtTgtMonth;
  ws.getCell(`G${rowIdx}`).value = forDebug[1].paymentDate;
  ws.getCell(`H${rowIdx}`).value = forDebug[1].OrderAmtTgtMonth;
  ws.getCell(`I${rowIdx}`).value = forDebug[2].paymentDate;
  ws.getCell(`J${rowIdx}`).value = forDebug[2].OrderAmtTgtMonth;
  ws.getCell(`L${rowIdx}`).value = 0;
  ws.getCell(`N${rowIdx}`).value = 0;
  ws.getCell(`P${rowIdx}`).value = 0;
  ws.getCell(`Q${rowIdx}`).value = costManagement.発注金額_税抜 - costManagement.支払金額_税抜;


  // 余ったシートを削除
  while (workbook.getWorksheet(`原価管理表 (${++currSheetIdx})`)) {
    workbook.removeWorksheet(`原価管理表 (${currSheetIdx})`);
  }

  // 発注詳細
  const savePath = path.join(__dirname, `../__TEMP__/原価見積_${costManagement.projNum}.xlsx`);
  await workbook.xlsx.writeFile(savePath);
};
