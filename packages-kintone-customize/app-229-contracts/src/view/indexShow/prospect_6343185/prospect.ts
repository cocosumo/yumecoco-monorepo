import $ from 'jquery';
import { getCachedStores } from "../../../../jsedit/api/getCachedStores";
import { displayResult } from './displayResult';
import './sheet.css';
import { createPrintButton } from '../../../../jsedit/initialize/createToolbar/createPrintButton';
import { addPrintButtonTrigger } from '../../../../jsedit/triggers/button';


export const prospect = async () => {
    console.log("見込み一覧、開始しました");

    const printButtonId = 'printButton';
    createPrintButton();
    addPrintButtonTrigger();

    


    $('#root').append(`
        <label>店舗：</label>
        <select id="selectStore"></select>
        <button value='test' id="${printButtonId}">印刷</button>

        
        
        
    `)

    
    
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



    $('#root').append(`
        <div id ="printArea"></div>
    `)

    


}