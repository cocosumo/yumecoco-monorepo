import $ from 'jquery';
import { getCachedStores } from "../../../../jsedit/api/getCachedStores";
import { displayResult } from './displayResult';
import './sheet.css';

//見込み一覧の作成

export const prospect = async () => {
    console.log("見込み一覧、開始しました");

    
    const printButtonId = 'printButton';

    //選択ボタン、印刷ボタンの生成
    $('#root').append(`
        <div class="selectButtonArea">
            <label>　店舗：</label>
            <select id="selectStore"></select>
            <button value='test' id="${printButtonId}">印刷</button>
                <div class="attention">
                    <h1 style="font-size: 16pt;">【見込み一覧の表示内容について】</h1>
                    <p>・「未契約」かつ「ランク」が入っているものだけ表示されます。</p>
                    <p>　※ランクが「- ハイフン（未指定）」のものは表示されません。</p>
                    <p>・行をクリックすると編集画面に移ります。</p>
                    <p>　画面一番下に見込み入力箇所があるので、必要に応じてランク等を変更してください。</p>
                </div>
        </div>
        <div id ="printArea"></div>
    `);

    //印刷アクション
    $('#printButton').on(
        'click',
         (e) => {
            window.print();

    });
      
        //選択肢（店舗及び全店舗）を生成
        const stores = await getCachedStores();
        
        $('#selectStore').append(`
            <option value="">全店舗</option>
        `);

        stores.forEach((store) => {
            $('#selectStore').append(`
            <option value="${store.uuid.value}">${store.storeNameShort.value}</option>
            `);
        });

   

    //event
    displayResult();

    //店舗選択が変更された時に表示結果も変更する
    $('#selectStore').on('change', (e) => {

        const selectStoreName = stores.find(({uuid}) => {
            return (e.target as any).value === uuid.value;

        })?.店舗名.value;

    
        //event
        displayResult(selectStoreName);



               
    });



    

    


}