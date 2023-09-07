//メインテーブルの作成。
(function () {
  "use strict";


  const commisionRates = 6343111; // 紹介料一覧
  const storeAppId = 19;  //店舗リスト アプリID
  const contractsAppId = 229;  //契約一覧アプリID
  
  //該当月ソート
  function getFirstAndLastDay(year, month) {
  // Create a Date object for the first day of the month
  const firstDay = moment({ year, month: month - 1, day: 1 });
  const lastDay = moment({ year, month: month - 1 }).endOf('month');

  return {
    firstDay: firstDay.format('YYYY-MM-DD'),
    lastDay: lastDay.format('YYYY-MM-DD'),
  };
}
  
  
const getContractRecords = (year, month, store) => {
  const {
    firstDay,
    lastDay
  } = getFirstAndLastDay(year, month);
  
  const query = `contractDate >= "${firstDay}" and contractDate <= "${lastDay}" and storeId = "${store}" order by contractDate asc `;
  
  console.log('Query', query);
  
  return kintone.api(
    kintone.api.url("/k/v1/records", true),
    "GET",
    {
      app: contractsAppId,
      query: query
    }
  );
  
}



const showContractRecords = (year, month, store) => {
  
   //表のタイトルを編集（店舗、表示月を追加）
    const addTitleElement = document.getElementById("headerTitle");
    
    const fomattedTitle =`ここすも${store} ${month}月度 契約一覧表`;
    addTitleElement.textContent = fomattedTitle;
    
  // レコードIDを取得
  getContractRecords(year, month, store)
   .then((result) => {
     const { records } = result;
     
     //records.sort((a, b) => {
    //   const dateA = new Date(a.contractDate.value);
    //   const dateB = new Date(b.contractDate.value);
    //   return dateA - dateB;
    // });
    
   

     
      $('#mainTable tbody').empty();  //選択変更時にリストをリセット
     
     records
      .forEach((rec, idx) => {
       console.log('rec', rec);
       //リスト書き出し
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
        yumeAGName2
       } = rec;
       
       // 粗利率を計算
        const grossProfitMargin = (editProfit.value / contractAmountNotax.value) * 100;
        console.log(grossProfitMargin);
        
        // 粗利率を表示（小数点以下2桁まで）
        const formattedGrossProfitMargin = grossProfitMargin.toFixed(2) + '%';
        console.log(formattedGrossProfitMargin);
          
       function formatCurrency(amount) {
        // 3桁ごとにカンマを挿入するフォーマットに変換
        const formattedAmount = amount.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' });
        return formattedAmount;

    }
    
    
    
        //リスト転記
        
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
              <th id="profitIntax">${formatCurrency(parseFloat(profit.value * 1.1))}</th>
              <th id="fee">${formatCurrency(parseFloat(fee.value))}</th>
              <th id="editProfit">${formattedGrossProfitMargin}</th>
              <th id="yumeAGName">${yumeAGName.value}</th>
              <th id="yumeAGName2">${yumeAGName2.value}</th>
            </tr>
          `)
       
     })
     
     //週ごとの計算
     //選択した月の月曜～日曜までを各週としてリスト配列
      function getWeekDates(year, month){

      const date = new Date(year, month, 0);
      const maxDays = date.getDate();    //該当月の最終日付
      const lastDayIdx = date.getDate()
      
      console.log(maxDays)
      
      let weeks = [];
      
      let currResult = {
          startDate: null,  //週の始まりの日付
          endDate: null    //週の終わりの日付
      };
      
      for(let i = 1; i <= maxDays; i++ ){
          let currDate = new Date(year, date.getMonth() , i)
          
          const weekIdx = currDate.getDay();
          
          if(weekIdx === 0 && i === 1){
              currResult.startDate = currDate;
              currResult.endDate = currDate;
          }
          
          if(i === 1 || weekIdx === 1){
              currResult.startDate = currDate;    
          } else if(i === maxDays || weekIdx === 0){
              currResult.endDate = currDate;
          }
          
          if(currResult.startDate && currResult.endDate ){
              weeks.push({
                  startDate: currResult.startDate,
                  endDate: currResult.endDate
              });
              currResult.startDate = null;
              currResult.endDate = null;
          }
      }
  
      return weeks;
  }

  //console.log(getWeekDates($('#selectYear').val(), $('#selectMonth').val()));  

  const getWeeks = getWeekDates($('#selectYear').val(), $('#selectMonth').val())
  console.log(getWeeks);


  $('#subTable tbody').empty();  //選択変更時にリストをリセット
  
  const weeklyTotalFees = new Array(getWeeks.length).fill(0);

    // 各契約日を該当する週に関連付ける
    const contractWeeks = records.map((rec) => {
        const contractDate = moment(rec.contractDate);
        const weekIndex = getWeeks.findIndex((week) => contractDate.isBetween(week.startDate, week.endDate, undefined, '[]'));
        return {
            contractDate,
            weekIndex
        };
    });

  
  getWeeks.forEach((item,index) => {

   // let totalFee = 0;
    let totalContractAmountIntax = 0;
    let totalProfit = 0;
    let totalNumberSum = 0;
    
    
 
  for (const contract of contractWeeks) {
        if (contract.weekIndex === index) {
            weeklyTotalFees[index] += +rec.fee.value;
        }
    }
    
    $('#subTable tbody')
          .append(`
            <tr>
                  <th id="weekHeader">第${index +1}週：${moment(item.startDate).format("M/D")}～${moment(item.endDate).format("M/D")}</th>
                  <th id="weekContractAmountIntax"></th>
                  <th id="weekProfit"></th>
                  <th id="weekProfitIntax"></th>
                  <th id="weekFee">${weeklyTotalFees[index]}</th>
                  <th id="WeekNumberSum"></th>
              </tr>
            `)

    })

  })



       
   


  
  // 表示
}
  

  kintone.events.on('app.record.index.show', (event)=>{
      console.log(event);
      //const viewId = event.viewId;
      const {
        viewId
      } = event;
      
      console.log('viewId',viewId);
      if(viewId === commisionRates){
        
        console.log('実行されました！')
        const currentYear = new Date().getFullYear();
        const lastYear = 2020;

        
        for (var year = currentYear; year >= lastYear; year--) {
          $('#selectYear').append($('<option>', {
            value: year,
            text: year
          }));
        }
      
          
        var monthSelect = document.querySelector("#selectMonth");
        for (var month = 1; month <= 12; month++) {
          var newOption = document.createElement("option");
          newOption.text = month + "月";
          newOption.value = month;
          monthSelect.add(newOption);
        }
        const toMonth = new Date().getMonth() + 1;
        monthSelect.value = toMonth;
        
        //htmlの作成日に今日の日付を表示
        const createdDateElement = document.getElementById("todayDate");

        // 現在の日付を取得
        const currentDate = new Date();
        const toyear = currentDate.getFullYear();
        const tomonth = currentDate.getMonth() + 1;
        const today = currentDate.getDate();
        const formattedDate = `作成日：${toyear}/${tomonth < 10 ? '0' : ''}${tomonth}/${today < 10 ? '0' : ''}${today}`;
        
          
        
        // テキストを設定
        createdDateElement.textContent = formattedDate;
        
        kintone.api(
          kintone.api.url("/k/v1/records", true),
          "GET",
          {
            app: storeAppId,
          },
          function (response) {
            var records = response.records;
            var storeSelect = document.getElementById("selectStore");
            console.log('Getting stores');
            
            // records 配列を sortNumber プロパティの値で昇順にソート
            records.sort(function(a, b) {
                let sortNumberA = a["sortNumber"].value;
                let sortNumberB = b["sortNumber"].value;
            
                // 数値として比較するために parseInt を使用
                return parseInt(sortNumberB, 10) - parseInt(sortNumberA, 10);
            });
      
            // 取得した店舗リストをプルダウンメニューに追加
            records.forEach(function (record) {
              var storeValue = record["storeCode"].value; // "storeCode" フィールドの値を取得
          　　　　 if (storeValue !== "") {
                  var storeName = record["店舗名"].value; // フィールドコードに適切なものを指定
                  var storeId = record["uuid"].value; // レコードIDを取得する場合
                  var sortNumber = record["sortNumber"].value;
                  var option = document.createElement("option");
                  option.text = storeName;
                  option.value = storeId;
                  storeSelect.add(option);
              }
            });
            
             
            
            showContractRecords(

              $('#selectYear').val(),
              $('#selectMonth').val(),
              $('#selectStore').val()
              
             
            );
            
            
            
          },
          function (error) {
            console.error("店舗リストの取得に失敗しました:", error);
          }
        );
        

        $('#selectYear, #selectMonth, #selectStore').change(function() {
          showContractRecords(
            $('#selectYear').val(),
            $('#selectMonth').val(),
            $('#selectStore').val()
          );
        });
              
      }
      
      
    
  })

})();
