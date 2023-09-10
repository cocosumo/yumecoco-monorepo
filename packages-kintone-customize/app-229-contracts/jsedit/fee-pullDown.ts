
import moment from 'moment';
import { IStores } from 'types';
import  $ from 'jquery';
import './yumetetsu_syokairyou.css';
import { refreshResult } from './refreshResult';
import { hightlightRowsByWeek } from './highlightRowsByWeek';


(function () {
  'use strict';

  const commissionRates = 6343111; // 紹介料一覧
  const commissionRatesDev = 6343125; // 紹介料一覧（開発用）
  const storeAppId = 19;

  kintone.events.on('app.record.index.show', (event)=>{
    console.log(event);
    //const viewId = event.viewId;
    const {
      viewId,
    } = event;
      
    console.log('viewId', viewId);
    if (viewId === commissionRates || viewId === commissionRatesDev) {

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

      $('#todayDate').text(`作成日：${moment().format('YYYY年MM月DD日')}`);

      const selectYear = document.getElementById('selectYear') as HTMLSelectElement;
      const selectMonth = document.getElementById('selectMonth') as HTMLSelectElement;
      const selectStore = document.getElementById('selectStore') as HTMLSelectElement;
        
      console.log('実行されました！');
      const currentYear = new Date().getFullYear();
      const lastYear = 2020;

        
      for (let year = currentYear; year >= lastYear; year--) {
        const option = document.createElement('option') as HTMLOptionElement;
        option.value = String(year);
        option.text = String(year);

        selectYear.appendChild(option);
      }
      
          
      for (let month = 1; month <= 12; month++) {
        const newOption = document.createElement('option');
        newOption.text = month + '月';
        newOption.value = String(month);
        selectMonth?.add(newOption);
      }
      const toMonth = new Date().getMonth() + 1;
      selectMonth.value = String(toMonth);

      // middle align 件数　with 30px width

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
        
      kintone.api(
        kintone.api.url('/k/v1/records', true),
        'GET',
        {
          app: storeAppId,
        },
        function (response) {
          const records = response.records as Array<IStores>;
            
          // records 配列を sortNumber プロパティの値で昇順にソート
          records.sort(function (a, b) {
            const sortNumberA = a.sortNumber.value;
            const sortNumberB = b.sortNumber.value;
            
            // 数値として比較するために parseInt を使用
            return parseInt(sortNumberB, 10) - parseInt(sortNumberA, 10);
          });
      
          // 取得した店舗リストをプルダウンメニューに追加
          records.forEach(function (record) {
            const storeValue = record.storeCode.value; // "storeCode" フィールドの値を取得
            if (storeValue !== '') {
              const storeName = record['店舗名'].value; // フィールドコードに適切なものを指定
              const storeId = record.uuid.value; // レコードIDを取得する場合
              //const sortNumber = record.sortNumber.value;
              const option = document.createElement('option');
              option.text = storeName;
              option.value = storeId;
              selectStore.add(option);
            }
          });

          refreshResult();

        },
        function (error) {
          console.error('店舗リストの取得に失敗しました:', error);
        },
      );
        
      
      $('#selectYear, #selectMonth, #selectStore').change(function () {
        refreshResult();
      });

      $('#printButton').click(function () {
        window.print();
      });

      $('#selectWeek').change(function () {
        console.log('selectWeek changed');
        hightlightRowsByWeek();
      });
              
    }
    
    
  });

})();
