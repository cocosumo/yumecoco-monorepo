
import moment from 'moment';
import { IStores } from 'types';
import  $ from 'jquery';


(function () {
  'use strict';

  const commisionRates = 6343111; // 紹介料一覧
  const storeAppId = 19;
  const contractsAppId = 229;

  function getWeekDates(year: number, month: number) {

    const date = new Date(year, month, 0);
    const maxDays = date.getDate();    //該当月の最終日付
      
    console.log(maxDays);
      
    const weeks = [];
      
    const currResult: Record<string, null | Date> = {
      startDate: null,  //週の始まりの日付
      endDate: null,    //週の終わりの日付
    };
      
    for (let i = 1; i <= maxDays; i++ ) {
      const currDate = new Date(year, date.getMonth(), i);
          
      const weekIdx = currDate.getDay();
          
      if (weekIdx === 0 && i === 1) {
        currResult.startDate = currDate;
        currResult.endDate = currDate;
      }
          
      if (i === 1 || weekIdx === 1) {
        currResult.startDate = currDate;    
      } else if (i === maxDays || weekIdx === 0) {
        currResult.endDate = currDate;
      }
          
      if (currResult.startDate && currResult.endDate ) {
        weeks.push({
          startDate: currResult.startDate,
          endDate: currResult.endDate,
        });
        currResult.startDate = null;
        currResult.endDate = null;
      }
    }
  
    return weeks;
  }
  
  
  function getFirstAndLastDay(
    year: number, 
    month: number,
  ) {
  // Create a Date object for the first day of the month
    const firstDay = moment({ year, month: month - 1, day: 1 });
    const lastDay = moment({ year, month: month - 1 }).endOf('month');

    return {
      firstDay: firstDay.format('YYYY-MM-DD'),
      lastDay: lastDay.format('YYYY-MM-DD'),
    };
  }
  
  
  const getContractRecords = async (
    year: number, 
    month: number, 
    store: string,
  ) : Promise<{
    records: Array<DB.SavedRecord>,
    totalCount: number,
  }> => {
    const {
      firstDay,
      lastDay,
    } = getFirstAndLastDay(year, month);
  
    const query = `contractDate >= "${firstDay}" and contractDate <= "${lastDay}" and storeId = "${store}" order by contractDate asc `;
  
    console.log('Query', query);
  
    return kintone.api(
      kintone.api.url('/k/v1/records', true),
      'GET',
      {
        app: contractsAppId,
        query: query,
      },
    );
  
  };



  const showContractRecords = (
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
            console.log('rec', rec);
       
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
            console.log(grossProfitMargin);
        
            // 粗利率を表示（小数点以下2桁まで）
            const formattedGrossProfitMargin = grossProfitMargin.toFixed(2) + '%';
            console.log(formattedGrossProfitMargin);
          
            function formatCurrency(amount: number) {
              // 3桁ごとにカンマを挿入するフォーマットに変換
              const formattedAmount = amount.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' });
              return formattedAmount;

            }
        
            $('#mainTable tbody')
              .append(`
                <tr>
                    <th id="number">${idx + 1}</th>
                    <th id="projTypeName">${projTypeName.value}</th>
                    <th id="custName">${custName.value}</th>
                    <th id="projName">${projName.value}</th>
                    <th id="contractDate">${contractDate.value}</th>
                    <th id="contractAmountIntax">${formatCurrency(parseFloat(contractAmountIntax.value))}</th>
                    <th id="contractAmountNotax">${formatCurrency(parseFloat(contractAmountNotax.value))}</th>
                    <th id="profit">${formatCurrency(parseFloat(profit.value))}</th>
                    <th id="profitIntax">${formatCurrency(+profit.value * 1.1)}</th>
                    <th id="fee">${formatCurrency(parseFloat(fee.value))}</th>
                    <th id="editProfit">${formattedGrossProfitMargin}</th>
                    <th id="yumeAGName">${yumeAGName.value}</th>
                    <th id="yumeAGName2">${yumeAGName2.value}</th>
                  </tr>
                `);
       
          });

        const getWeeks = getWeekDates(
          +(document.querySelector('#selectYear') as HTMLSelectElement).value, 
          +(document.querySelector('#selectMonth') as HTMLSelectElement).value,
        ); 

        $('#subTable tbody').empty();  //選択変更時にリストをリセット

        const weeklyTotalFees = new Array(getWeeks.length).fill(0);

        // 各契約日を該当する週に関連付ける
        const contractWeeks = records.map((rec) => {
          const contractDate = moment(rec.contractDate.value);
          const weekIndex = getWeeks.findIndex((week) => contractDate.isBetween(week.startDate, week.endDate, undefined, '[]'));
          return {
            contractDate,
            weekIndex,
          };
        });

        getWeeks.forEach((item, index) => {

          // let totalFee = 0;
          const totalContractAmountIntax = 0;
          const totalProfit = 0;
          const totalNumberSum = 0;
    
    
 
          for (const contract of contractWeeks) {
            if (contract.weekIndex === index) {
              //weeklyTotalFees[index] += +rec.fee.value; // 一旦コメントアウト -RAS
            }
          }
    
          $('#subTable tbody')
            .append(`
            <tr>
                  <th id="weekHeader">第${index + 1}週：${moment(item.startDate).format('M/D')}～${moment(item.endDate).format('M/D')}</th>
                  <th id="weekContractAmountIntax"></th>
                  <th id="weekProfit"></th>
                  <th id="weekProfitIntax"></th>
                  <th id="weekFee">${weeklyTotalFees[index]}</th>
                  <th id="WeekNumberSum"></th>
              </tr>
            `);

        });

     

      });
   

    
  
  // 表示
  };


  const refreshResult = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    const selectedYear = +(document.querySelector('#selectYear') as HTMLSelectElement).value || currentYear;
    const selectedMonth = +(document.querySelector('#selectMonth') as HTMLSelectElement).value || currentMonth;
    const selectedStore = (document.querySelector('#selectStore') as HTMLSelectElement).value;


    showContractRecords(
      selectedYear,
      selectedMonth,
      String(selectedStore),
    );
  };
  

  kintone.events.on('app.record.index.show', (event)=>{
    console.log(event);
    //const viewId = event.viewId;
    const {
      viewId,
    } = event;
      
    console.log('viewId', viewId);
    if (viewId === commisionRates) {

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
              
    }
      
      
    
  });

})();
