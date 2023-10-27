import { calcFontSize } from '../../../api/calcFontSize';
import { formatCurrency } from '../../../api/formatCurrency';

export const createTableContents = (
  $el: JQuery<HTMLElement>, 
  records: DB.SavedRecord[],
) => {
  const $tbody = $el.find('tbody');

  records
    .forEach((record, index) => {

      const {
        contractAmountIntax,
        contractAmountNotax,
        contractDate,
        custName,
        commission,
        profit,
        projName,
        projTypeName,
        yumeAGName,
        yumeAGName2,
        editProfit,
        $id,
      } = record;

      // 粗利率を計算
      const grossProfitMargin = (+editProfit.value / +contractAmountNotax.value) * 100;
        
      // 粗利率を表示（小数点以下2桁まで）
      const formattedGrossProfitMargin = grossProfitMargin.toFixed(2) + ' %';
    

      $tbody.append(`
       <tr data-id="${$id.value}" class=${projTypeName.value.includes('太陽') ? 'highlight_solar' : ''}>
          <td style="text-align: center;">${index + 1}</td>
          <td style="font-size: ${calcFontSize(80, projTypeName.value)}px;">${projTypeName.value}</td>
          <td style="font-size: ${calcFontSize(150, custName.value)}px;">${custName.value}</td>
          <td style="font-size: ${calcFontSize(200, projName.value)}px;">${projName.value}</td>
          <td>${contractDate.value}</td>
          <td style="text-align: right;">${formatCurrency(contractAmountIntax.value)}</td>
          <td style="text-align: right;">${formatCurrency(parseFloat(contractAmountNotax.value))}</td>
          <td style="text-align: right;">${formatCurrency(profit.value)}</td>
          <td style="text-align: right;">${formatCurrency(+profit.value * 1.1)}</td>
          <td style="text-align: right;">${formatCurrency(commission.value)}</td>
          <td style="text-align: right;">${formattedGrossProfitMargin}</td>
          <td>${yumeAGName.value || 'ここすも'}</td>
          <td>${yumeAGName2.value}</td>
        </tr>
      `);


    });
};