import Excel from 'exceljs';
import { GetCostMgtData } from 'types';


export const initCostMngWorksheet = (
  sheetName: string,
  wb: Excel.Workbook,
  costManagement: GetCostMgtData,
) => {
  const ws = wb.getWorksheet(sheetName);
  ws.getCell('C3').value = costManagement.projNum; // 工事番号
  ws.getCell('G3').value = costManagement.projName; // 工事名
  ws.getCell('M3').value = costManagement.custGroupName; // 発注者
  ws.getCell('C5').value = costManagement.受注金額_税抜; // 受注金額
  ws.getCell('C6').value = costManagement.追加金額_税抜; // 追加金額
  ws.getCell('C7').value = costManagement.発注金額_税抜; // 発注金額
  ws.getCell('C8').value = costManagement.支払金額_税抜; // 支払金額
  ws.getCell('G5').value = `${costManagement.予定利益率}%`; // 予定利益率
  ws.getCell('H5').value = costManagement.予定利益額; // 予定利益額
  ws.getCell('G6').value = `${costManagement.実利益率}%`; // 実利益率
  ws.getCell('H6').value = costManagement.実利益額; // 実利益額
  ws.getCell('G8').value = `${costManagement.利益配分_夢てつ}%`; // 夢てつ利益配分率
  ws.getCell('H8').value = `${costManagement.利益配分_ここすも}%`; // ここすも利益配分率
  ws.getCell('G9').value = costManagement.実利益税抜_夢てつ; // 夢てつ実利益額
  ws.getCell('H9').value = costManagement.実利益税抜_ここすも; // ここすも実利益額
  ws.getCell('G10').value = ''; // 夢てつ利益(現状未使用)
  ws.getCell('H10').value = ''; // ここすも利益(現状未使用)
  ws.getCell('L5').value = costManagement.受注額計_税込; // 受注額計税込
  ws.getCell('L6').value = costManagement.受注額計_税抜; // 受注額計税抜
  ws.getCell('L7').value = costManagement.入金額; // 入金額
  ws.getCell('L8').value = costManagement.未入金; // 未入金額
  ws.getCell('P5').value = costManagement.夢てつ営業; // 夢てつ営業
  ws.getCell('P6').value = costManagement.ここすも営業; // ここすも営業
  ws.getCell('P7').value = costManagement.ここすも工事; // ここすも工事
  return ws;
};
