import { GetCostManagement } from './getCostManagement';
import { getFilePath } from 'kokoas-server/src/assets';
import path from 'path';


/**
 * 案件の原価見積もりから工事別原価管理表を作成します
 * @param costManagement 原価見積もりの整形済みデータ
 */
export const createCostMngXlsxPopulate = async (costManagement: GetCostManagement) => {

  const costMngFilePath = getFilePath({
    fileName: '原価見積',
    fileType: 'xlsx',
  });

  const XlsxPopulate = await require('xlsx-populate');

  
  // テンプレートファイルからワークブックを読み込む
  XlsxPopulate.fromFileAsync(costMngFilePath)
    .then((workbook: any) => {
      // セルに値を書き込む
      // 工事情報と見積もり概要
      workbook.sheet('原価管理表').cell('C3')
        .value(costManagement.projNum); // 工事番号
      workbook.sheet('原価管理表').cell('G3')
        .value(costManagement.projName); // 工事名
      workbook.sheet('原価管理表').cell('M3')
        .value(costManagement.custGroupName); // 発注者
      workbook.sheet('原価管理表').cell('C5')
        .value(costManagement.受注金額_税抜); // 受注金額
      workbook.sheet('原価管理表').cell('C6')
        .value(costManagement.追加金額_税抜); // 追加金額
      workbook.sheet('原価管理表').cell('C7')
        .value(costManagement.発注金額_税抜); // 発注金額
      workbook.sheet('原価管理表').cell('C8')
        .value(costManagement.支払金額_税抜); // 支払金額
      workbook.sheet('原価管理表').cell('G5')
        .value(`${costManagement.予定利益率}%`); // 予定利益率
      workbook.sheet('原価管理表').cell('H5')
        .value(costManagement.予定利益額); // 予定利益額
      workbook.sheet('原価管理表').cell('G6')
        .value(`${costManagement.実利益率}%`); // 実利益率
      workbook.sheet('原価管理表').cell('H6')
        .value(costManagement.実利益額); // 実利益額
      workbook.sheet('原価管理表').cell('G8')
        .value(`${costManagement.利益配分_夢てつ}%`); // 夢てつ利益配分率
      workbook.sheet('原価管理表').cell('H8')
        .value(`${costManagement.利益配分_ここすも}%`); // ここすも利益配分率
      workbook.sheet('原価管理表').cell('G9')
        .value(costManagement.実利益税抜_夢てつ); // 夢てつ実利益額
      workbook.sheet('原価管理表').cell('H9')
        .value(costManagement.実利益税抜_ここすも); // ここすも実利益額
      workbook.sheet('原価管理表').cell('G10')
        .value(''); // 夢てつ利益(現状未使用)
      workbook.sheet('原価管理表').cell('H10')
        .value(''); // ここすも利益(現状未使用)
      workbook.sheet('原価管理表').cell('L5')
        .value(costManagement.受注額計_税込); // 受注額計税込
      workbook.sheet('原価管理表').cell('L6')
        .value(costManagement.受注額計_税抜); // 受注額計税抜
      workbook.sheet('原価管理表').cell('L7')
        .value(costManagement.入金額); // 入金額
      workbook.sheet('原価管理表').cell('L8')
        .value(costManagement.未入金); // 未入金額
      workbook.sheet('原価管理表').cell('P5')
        .value(costManagement.夢てつ営業); // 夢てつ営業
      workbook.sheet('原価管理表').cell('P6')
        .value(costManagement.ここすも営業); // ここすも営業
      workbook.sheet('原価管理表').cell('P7')
        .value(costManagement.ここすも工事); // ここすも工事

      // ファイルに保存する
      return workbook.toFileAsync(path.join(__dirname, `./__TEMP__/原価見積_${costManagement.projNum}_ver2.xlsx`));
    });


};
