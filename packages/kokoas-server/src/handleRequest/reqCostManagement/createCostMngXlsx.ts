import xlsx from 'xlsx';
import { getFilePath } from 'kokoas-server/src/assets';
import path from 'path';
import { GetCostManagement } from 'api-kintone/src/andpadProcurement/getCostMgtData';


/**
 * 案件の原価見積もりから工事別原価管理表を作成します
 * @param costManagement 原価見積もりの整形済みデータ
 */
export const createCostMngXlsx = (costManagement: GetCostManagement) => {

  const costMngFilePath = getFilePath({
    fileName: '原価見積',
    fileType: 'xlsx',
  });
  const wb = xlsx.readFile(costMngFilePath);


  const sheet = wb.Sheets[wb.SheetNames[0]]; // 最初のシートを取得
  // 工事情報と見積り概要
  sheet.C3 = { t: 's', v: costManagement.projNum }; // 工事番号
  sheet.G3 = { t: 's', v: costManagement.projName }; // 工事名
  sheet.M3 = { t: 's', v: costManagement.custGroupName }; // 発注者
  sheet.C5 = { t: 'n', v: costManagement.受注金額_税抜 }; // 受注金額
  sheet.C6 = { t: 'n', v: costManagement.追加金額_税抜 }; // 追加金額
  sheet.C7 = { t: 'n', v: costManagement.発注金額_税抜 }; // 発注金額
  sheet.C8 = { t: 'n', v: costManagement.支払金額_税抜 }; // 支払金額
  sheet.G5 = { t: 's', v: `${costManagement.予定利益率}%` }; // 予定利益率
  sheet.H5 = { t: 'n', v: costManagement.予定利益額 }; // 予定利益額
  sheet.G6 = { t: 's', v: `${costManagement.実利益率}%` }; // 実利益率
  sheet.H6 = { t: 'n', v: costManagement.実利益額 }; // 実利益額
  sheet.G8 = { t: 's', v: `${costManagement.利益配分_夢てつ}%` }; // 夢てつ利益配分率
  sheet.H8 = { t: 's', v: `${costManagement.利益配分_ここすも}%` }; // ここすも利益配分率
  sheet.G9 = { t: 'n', v: costManagement.実利益税抜_夢てつ }; // 夢てつ実利益額
  sheet.H9 = { t: 'n', v: costManagement.実利益税抜_ここすも }; // ここすも実利益額
  sheet.G10 = { t: 's', v: '' }; // 夢てつ利益(現状未使用)
  sheet.H10 = { t: 's', v: '' }; // ここすも利益(現状未使用)
  sheet.L5 = { t: 'n', v: costManagement.受注額計_税込 }; // 受注額計税込
  sheet.L6 = { t: 'n', v: costManagement.受注額計_税抜 }; // 受注額計税抜
  sheet.L7 = { t: 'n', v: costManagement.入金額 }; // 入金額
  sheet.L8 = { t: 'n', v: costManagement.未入金 }; // 未入金額
  sheet.P5 = { t: 's', v: costManagement.夢てつ営業 }; // 夢てつ営業
  sheet.P6 = { t: 's', v: costManagement.ここすも営業 }; // ここすも営業
  sheet.P7 = { t: 's', v: costManagement.ここすも工事 }; // ここすも工事

  // 発注詳細

  xlsx.writeFile(wb, path.join(__dirname, `./__TEMP__/原価見積_${costManagement.projNum}.xlsx`));
};
