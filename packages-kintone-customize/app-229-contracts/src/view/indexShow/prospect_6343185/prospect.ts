import $ from 'jquery';
import { getCachedStores } from "../../../../jsedit/api/getCachedStores";
import { displayResult } from './displayResult';
import './sheet.css';


export const prospect = async () => {
    console.log("見込み一覧、開始しました");

    
    const printButtonId = 'printButton';


    $('#root').append(`
        <div class="selectButtonArea">
            <label>　店舗：</label>
            <select id="selectStore"></select>
            <button value='test' id="${printButtonId}">印刷</button>
        </div>
        <div id ="printArea"></div>
    `)


    $('#printButton').on(
        'click',
         (e) => {
            window.print();

    })
      
    
        const stores = await getCachedStores();
        
        $('#selectStore').append(`
            <option value="">全店舗</option>
        `);

        stores.forEach((store) => {
            $('#selectStore').append(`
            <option value="${store.uuid.value}">${store.storeNameShort.value}</option>
            `);
        });

    let selectedStore = "";

    //event
    displayResult();

    
    $('#selectStore').on('change', (e) => {

        const selectStoreName = stores.find(({uuid}) => {
            return (e.target as any).value === uuid.value;

        })?.店舗名.value;

    
        //event
        displayResult(selectStoreName);



               
    })



    

    


}