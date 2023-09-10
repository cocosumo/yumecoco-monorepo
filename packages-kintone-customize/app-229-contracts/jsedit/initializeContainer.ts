import $ from 'jquery';
import moment from 'moment';

export const initializeContainer = () => {
  
  $('#custom_toolbar').append(`
        <label for="selectYear">　年：</label>
        <select id="selectYear"></select>
        
        <label for="selectMonth">月：</label>
        <select id="selectMonth"></select>
        
        <label for="selectStore">店舗：</label>
        <select id="selectStore"></select>

        <label for="selectWeek">ハイライト：</label>
        <select id="selectWeek"></select>

        <button id="printButton">印刷</button>
      `);

      
  $('#mainTable')
    .append(`
        <thead>
            <tr>
              
                <th style="width: 30px;">
                  件数
                </th>
                <th style="width: 80px;">工事種別</th>
                <th style="width: 150px;">発注者</th>
                <th style="width: 200px;">工事名</th>
                <th style="width: 80px;">契約日</th>
                <th>契約金額(税込)</th>
                <th>粗利金額(税抜)</th>
                <th>粗利金額(税抜)</th> 
                <th>粗利金額(税込)</th>       <!-- フィールド内は税抜きのためprofit*1.1すること -->
                <th>夢てつ入金(税込)</th>
                <th style="width: 70px;">総粗利率</th>
                <th>AG1</th>
                <th>AG2</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
                `);

  $('#todayDate').text(`作成日：${moment().format('YYYY年MM月DD日')}`);

};