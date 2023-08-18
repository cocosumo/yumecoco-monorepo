import Excel from 'exceljs';
import { getFilePath } from 'kokoas-server/src/assets';
import { GetCostMgtData } from 'types';
import { initCostMngWorksheet } from './initCostMngWorksheet';
import { Big } from 'big.js';
import { createOrderAmountPerMonth } from './createOrderAmountPerMonth';
import { format, lastDayOfMonth } from 'date-fns';
import parseISO from 'date-fns/parseISO';


const maxMonths = 6;

const unPaidMoney = (ws: Excel.Worksheet, rowIdx: number, columnOffset: number) => {
  let returnVal = ws.getCell(`C${rowIdx}`).value ?? '0';
  for (let idx = 0; idx <= maxMonths; idx++) {
    const subAmt = ws.getCell(rowIdx, columnOffset + (idx * 4) + 3).value ?? '0';
    returnVal = Big(+returnVal).minus(+subAmt)
      .toNumber();
  }

  return returnVal;
};

const dateFormat = (isoStringDate: string) => {

  try {
    if (isoStringDate === 'unknown') return '未定';
    const isoDate = parseISO(isoStringDate);
    return format(lastDayOfMonth(isoDate), 'yyyy.MM.dd');
  } catch (e) {
    console.log('dateFormat error', e);
    return 'エラー';
  }

};

/**
 * 案件の原価見積もりから工事別原価管理表を作成します
 * @param costManagement 原価見積もりの整形済みデータ
 */
export const createCostMngXlsx = async (costManagement: GetCostMgtData) => {

  const costMngFilePath = getFilePath({
    fileName: '原価見積',
    fileType: 'xlsx',
    version: '20230808',
  });

  // Read excel file.
  let workbook = new Excel.Workbook();
  workbook = await workbook.xlsx.readFile(costMngFilePath);

  console.log('costManagement::', costManagement);


  const {
    months,
  } = costManagement;

  // 月ごとの発注額合計計算要のobjを準備する
  const orderAmountPerMonth = createOrderAmountPerMonth(months);


  const tgtMonthList = Object.keys(orderAmountPerMonth);
  const isOverflow = tgtMonthList.length > maxMonths;

  console.log('tgtMonthList::', tgtMonthList, isOverflow);

  // excelファイル書き込み処理
  const maxRows = 25;
  const rowOffset = 13; // 14行目から開始
  const columnOffset = 3; // 4列目(D列)から開始

  let currRowIdx = 1;
  let currSheetIdx = 1;
  let wsName = '原価管理表';

  let ws = initCostMngWorksheet(wsName, workbook, costManagement);
  let rowIdx = currRowIdx + rowOffset;

  console.log(orderAmountPerMonth);


  // 支払処理済欄を反映する
  for (const procurement of costManagement.発注情報詳細) {
    if (currRowIdx > maxRows) {
      // 次のシートへ
      currRowIdx = 1;
      wsName = `原価管理表 (${++currSheetIdx})`;
      ws = initCostMngWorksheet(wsName, workbook, costManagement);
    }

    rowIdx = currRowIdx + rowOffset;
    // 発注先情報の反映
    ws.getCell(`A${rowIdx}`).value = currRowIdx + ((currSheetIdx - 1) * 15);
    ws.getCell(`B${rowIdx}`).value = procurement.supplierName;
    ws.getCell(`C${rowIdx}`).value = procurement.contractOrderCost;

    // 支払い実績の反映

    for (const paymentHistory of procurement.paymentHistory) {
      const tgtMonth = dateFormat(paymentHistory.paymentDate ?? '');

      // 月ごとの合計金額を計算する
      if (tgtMonth !== '') {
        orderAmountPerMonth[tgtMonth] = {
          ...orderAmountPerMonth[tgtMonth],
          orderAmtTgtMonth: Big(orderAmountPerMonth[tgtMonth].orderAmtTgtMonth).plus(paymentHistory.paymentAmtBeforeTax)
            .toNumber(),
        };


        let tgtMonthIndex = tgtMonthList.indexOf(tgtMonth);
        if (isOverflow && tgtMonthIndex > maxMonths) tgtMonthIndex = 5;
        const columnIndex = columnOffset + (tgtMonthIndex * 4) + 1;

        // 6か月以前の発注履歴は行を追加して対応する
        const wsMonth = ws.getCell(rowIdx, columnIndex).value?.toString();
        if (wsMonth !== undefined && wsMonth !== tgtMonth) {

          // 未払金列の反映
          ws.getCell(`AB${rowIdx}`).value = unPaidMoney(ws, rowIdx, columnOffset);

          currRowIdx++;
          if (currRowIdx > maxRows) {
            // 次のシートへ
            currRowIdx = 1;
            wsName = `原価管理表 (${++currSheetIdx})`;
            ws = initCostMngWorksheet(wsName, workbook, costManagement);
          }
          rowIdx = currRowIdx + rowOffset;

          // 発注先情報も追加する
          ws.getCell(`A${rowIdx}`).value = currRowIdx + ((currSheetIdx - 1) * maxRows);
          ws.getCell(`B${rowIdx}`).value = procurement.supplierName;
          ws.getCell(`C${rowIdx}`).value = '';

        }
        const paymentAmtVal = ws.getCell(rowIdx, columnIndex + 2).value ?? '0';

        ws.getCell(rowIdx, columnIndex).value = tgtMonth;
        ws.getCell(rowIdx, columnIndex + 2).value = Big(+paymentAmtVal).plus(paymentHistory.paymentAmtBeforeTax)
          .toNumber();
      }
    }

    // 未払金列の反映
    ws.getCell(`AB${rowIdx}`).value = unPaidMoney(ws, rowIdx, columnOffset);

    currRowIdx++; // 次の行へ
  }


  // 合計欄の記入
  rowIdx = 39;
  ws.getCell(`C${rowIdx}`).value = costManagement.発注金額_税抜;
  ws.getCell(`AB${rowIdx}`).value = costManagement.発注金額_税抜 - costManagement.支払金額_税抜;

  Object.values(orderAmountPerMonth).forEach((orderAmount, index) => {
    if (index < maxMonths) {
      const columnIndex = columnOffset + 3 + (index * 4);
      ws.getCell(rowIdx, columnIndex).value = orderAmount.orderAmtTgtMonth;
    } else {
      const columnIndex = columnOffset + 3 + ((maxMonths - 1) * 4);
      const totalAmt = ws.getCell(rowIdx, columnIndex).value ?? 0;
      ws.getCell(rowIdx, columnIndex).value = +totalAmt + orderAmount.orderAmtTgtMonth;
    }
  });


  // 余ったシートを削除
  while (workbook.getWorksheet(`原価管理表 (${++currSheetIdx})`)) {
    workbook.removeWorksheet(`原価管理表 (${currSheetIdx})`);
  }

  // 発注詳細
  //const savePath = path.join(__dirname, `../__TEST__/原価見積_${costManagement.projNum}.xlsx`);
  //await workbook.xlsx.writeFile(savePath);

  return workbook;
};
