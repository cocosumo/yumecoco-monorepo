import initialize from './initialize';
import './yumetetsu_syokairyou.css';

/** 紹介料一覧 */
const commissionRates = 6343111; 

/** 紹介料一覧（開発用） */
const commissionRatesDev = 6343125; 

/** 店舗 */
const storeAppId = 19; // 店舗


(()=> {
  kintone.events.on('app.record.index.show', (event)=>{

    const {
      viewId,
    } = event;
    
    if (viewId === commissionRates || viewId === commissionRatesDev) {

      initialize();

      /* const selectYear = document.getElementById('selectYear') as HTMLSelectElement;
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

      $('#printButton').click(function () {
        window.print();
      });

      $('#selectWeek').change(function () {
        console.log('selectWeek changed');
        hightlightRowsByWeek();
      }); */
              
    }
    
    
  });

})();