import { calcFontSize } from '../../../api/calcFontSize';
import { formatCurrency } from '../../../api/formatCurrency';
/**
 * ゆめてつ紹介料 一覧中身
 * 
 * createTableContainer の tbody に入れ込む
*/
export const createTableContents = (
  $el: JQuery<HTMLElement>, 
  records: DB.SavedRecord[],
) => {
  const $tbody = $el.find('tbody');

  records
    .forEach((record, index) => {
    // forEachメソッドで繰り返す
      const {
        // kintoneのフィールドIDと同じ
        contractAmountIntax, // --契約金額(税込)
        contractAmountNotax, // --契約金額(税抜)
        contractDate, // ---------契約日
        custName, // -------------顧客名
        fee, // ------------------紹介料
        profit, // ---------------粗利額
        projName, // -------------工事名
        projTypeName, // ---------工事種別
        yumeAGName, // -----------ゆめてつAG1
        yumeAGName2, // ----------ゆめてつAG2
        editProfit, // -----------税込粗利額
        $id, // ------------------契約ID
      } = record;

      // 粗利率を計算
      const grossProfitMargin = (+editProfit.value / +contractAmountNotax.value) * 100;
        
      // 粗利率を表示（小数点以下2桁まで）
      const formattedGrossProfitMargin = grossProfitMargin.toFixed(2) + ' %';
    
      // tbodyに転記
      // 太陽光（includes('太陽')）と蓄電池（includes('蓄電池')）は個別ハイライト
      $tbody.append(`
       <tr data-id="${$id.value}" class=${projTypeName.value.includes('太陽') || projTypeName.value.includes('蓄電池') ? 'highlight_solar' : ''}> 
          <td style="text-align: center;">${index + 1}</td>
          <td style="font-size: ${calcFontSize(80, projTypeName.value)}px;">${projTypeName.value}</td>
          <td style="font-size: ${calcFontSize(150, custName.value)}px;">${custName.value}</td>
          <td style="font-size: ${calcFontSize(200, projName.value)}px;">${projName.value}</td>
          <td>${contractDate.value}</td>
          <td style="text-align: right;">${formatCurrency(contractAmountIntax.value)}</td>
          <td style="text-align: right;">${formatCurrency(parseFloat(contractAmountNotax.value))}</td>
          <td style="text-align: right;">${formatCurrency(profit.value)}</td>
          <td style="text-align: right;">${formatCurrency(+profit.value * 1.1)}</td>
          <td style="text-align: right;">${formatCurrency(fee.value)}</td>
          <td style="text-align: right;">${formattedGrossProfitMargin}</td>
          <td>${yumeAGName.value || 'ここすも'}</td>
          <td>${yumeAGName2.value}</td>
        </tr>
      `);


    });
};