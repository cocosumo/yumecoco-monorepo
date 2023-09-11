import moment from 'moment';
import { calcFontSize } from './api/calcFontSize';
import { getContractRecords } from './getContractRecords';
import { getWeekDates } from './getWeekDates';
import $ from 'jquery';

export const showContractRecords = (
  year: number, 
  month: number, 
  store: string,
) => {
  // レコードIDを取得
  getContractRecords(year, month, store)
    .then((result) => {
      const { records } = result;
     
      //records.sort((a, b) => {
      //   const dateA = new Date(a.contractDate.value);
      //   const dateB = new Date(b.contractDate.value);
      //   return dateA - dateB;
      // });
     
      $('#mainTable tbody').empty();
     
      records
        .forEach((rec, idx: number) => {
       
          const {
            projName,
            projTypeName,
            custName,
            contractDate,
            contractAmountIntax,
            contractAmountNotax,
            profit,
            editProfit,
            fee,
            yumeAGName,
            yumeAGName2,
          } = rec;
       
          // 粗利率を計算
          const grossProfitMargin = (+editProfit.value / +contractAmountNotax.value) * 100;
        
          // 粗利率を表示（小数点以下2桁まで）
          const formattedGrossProfitMargin = grossProfitMargin.toFixed(2) + '%';
          
          function formatCurrency(amount: number) {
            // 3桁ごとにカンマを挿入するフォーマットに変換
            const formattedAmount = amount.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' });
            return formattedAmount;

          }
        
          $('#mainTable tbody')
            .append(`
                <tr class=${projTypeName.value.includes('太陽') ? 'highlight_solar' : ''}>
                    <td style="text-align: center;">${idx + 1}</td>
                    <td style="font-size: ${calcFontSize(80, projTypeName.value)}px;">${projTypeName.value}</td>
                    <td style="font-size: ${calcFontSize(150, custName.value)}px;">${custName.value}</td>
                    <td style="font-size: ${calcFontSize(200, projName.value)}px;">${projName.value}</td>
                    <td id="contractDate">${contractDate.value}</td>
                    <td id="contractAmountIntax">${formatCurrency(parseFloat(contractAmountIntax.value))}</td>
                    <td id="contractAmountNotax">${formatCurrency(parseFloat(contractAmountNotax.value))}</td>
                    <td id="profit">${formatCurrency(parseFloat(profit.value))}</td>
                    <td id="profitIntax">${formatCurrency(+profit.value * 1.1)}</td>
                    <td id="fee">${formatCurrency(parseFloat(fee.value))}</td>
                    <td id="editProfit">${formattedGrossProfitMargin}</td>
                    <td id="yumeAGName">${yumeAGName.value}</td>
                    <td id="yumeAGName2">${yumeAGName2.value}</td>
                  </tr>
                `);
       
        });

      const getWeeks = getWeekDates(
        +(document.querySelector('#selectYear') as HTMLSelectElement).value, 
        +(document.querySelector('#selectMonth') as HTMLSelectElement).value,
      ); 

      $('#subTable tbody').empty();  //選択変更時にリストをリセット

      const weekOptions = getWeeks
        .map((_, index) => {
          return `<option value="${index}">第${index + 1}週</option>`;
        });
      weekOptions.unshift('<option value="">-</option>');

      $('#selectWeek')  //選択変更時にリストをリセット
        .empty()
        .append(weekOptions.join(''));
            
            
      // 週ごとに集計
      getWeeks.forEach((item, index) => {
          
        // let totalFee = 0;
        let totalContractAmountIntax = 0;
        let totalProfitInclTax = 0;
        let totalProfitExclTax = 0;
        let totalFee = 0;

        const thisWeekRecords = records
          .filter(({
            contractDate,
          }) => {
            const date = moment(contractDate.value);
            return date.isBetween(item.startDate, item.endDate, undefined, '[]');
          });
     
        for (const rec of thisWeekRecords) {
          totalContractAmountIntax += parseFloat(rec.contractAmountIntax.value);
          totalProfitExclTax += parseFloat(rec.profit.value);
          totalProfitInclTax +=  parseFloat(rec.profit.value) * 1.1;
          totalFee += parseFloat(rec.fee.value);
        }
    
        $('#subTable tbody')
          .append(`
            <tr>
                  <th id="weekHeader">第${index + 1}週：${moment(item.startDate).format('M/D')}～${moment(item.endDate).format('M/D')}</th>
                  <th id="weekContractAmountIntax">${totalContractAmountIntax.toLocaleString()}</th>
                  <th id="weekProfit">${ totalProfitExclTax.toLocaleString()}</th>
                  <th id="weekProfitIntax">${Math.round(totalProfitInclTax).toLocaleString() }</th>
                  <th id="weekFee">${totalFee.toLocaleString()}</th>
                  <th id="WeekNumberSum">${thisWeekRecords.length}</th>
              </tr>
            `);

      });

     

    });
   

    
  
  // 表示
};