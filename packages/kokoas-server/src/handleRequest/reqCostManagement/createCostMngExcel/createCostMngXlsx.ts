import Excel from 'exceljs';
import { getFilePath } from 'kokoas-server/src/assets';
import path from 'path';
import { GetCostMgtData } from 'types';
import { initCostMngWorksheet } from './initCostMngWorksheet';


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

  const maxRows = 15;
  const rowOffset = 13; // 14行目から開始

  let currRowIdx = 1;
  let currSheetIdx = 1;

  let ws = initCostMngWorksheet(`原価管理表 (${++currSheetIdx})`, workbook, costManagement);
  let rowIdx = currRowIdx + rowOffset;

  for (const procurement of costManagement.発注情報詳細) {

    if (currRowIdx > maxRows) {
      // 次のシートへ
      currRowIdx = 1;
      ws = initCostMngWorksheet(`原価管理表 (${++currSheetIdx})`, workbook, costManagement);
    }

    rowIdx = currRowIdx + rowOffset;
    // 発注先情報の反映
    ws.getCell(`A${rowIdx}`).value = currRowIdx;
    ws.getCell(`B${rowIdx}`).value = procurement.supplierName;
    ws.getCell(`C${rowIdx}`).value = procurement.orderAmountBeforeTax;

    // 支払い実績の反映


    currRowIdx++; // 次の行へ
  }


  // 合計欄の記入
  rowIdx = 39;
  ws.getCell(`C${rowIdx}`).value = costManagement.発注金額_税抜;
  ws.getCell(`F${rowIdx}`).value = 0;
  ws.getCell(`H${rowIdx}`).value = 0;
  ws.getCell(`J${rowIdx}`).value = 0;
  ws.getCell(`L${rowIdx}`).value = 0;
  ws.getCell(`N${rowIdx}`).value = 0;
  ws.getCell(`P${rowIdx}`).value = 0;
  ws.getCell(`Q${rowIdx}`).value = costManagement.発注金額_税抜 - costManagement.支払金額_税抜;


  // 余ったシートを削除
  while (workbook.getWorksheet(`内訳明細 (${++currSheetIdx})`)) {
    workbook.removeWorksheet(`内訳明細 (${currSheetIdx})`);
  }

  // 発注詳細
  const savePath = path.join(__dirname, `./__TEMP__/原価見積_${costManagement.projNum}.xlsx`);
  await workbook.xlsx.writeFile(savePath);
};
