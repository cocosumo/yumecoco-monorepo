import moment from "moment";
import { createSelect } from "../../../../jsedit/initialize/createToolbar/createSelect";
import { getGroupByStore } from "./getGroupByStore";
import { groupByProjType } from "./groupByProjType";
import $ from 'jquery';
import { populateSelectStore } from "../../../../jsedit/initialize/populateSelect/populateSelectStore";
import { createTable } from "@tanstack/react-table";
import { getCachedStores } from "../../../../jsedit/api/getCachedStores";


export const prospect = async () => {
    console.log("見込み一覧、開始しました");

    const groupStore = await getGroupByStore();

    console.log(groupStore);

    


        const createDate = moment();  //作成日の表示

    $('#root').append(`
        <label>店舗：</label>
        <select id="selectStore"></select>
        
        
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

    $('#selectStore').on('change', (e) => {

        const selectStoreName = stores.find(({uuid}) => {
            return (e.target as any).value === uuid.value;

        })?.uuid.value;



        if((e.target as any).value) {
            $('#printArea').empty();
            for(const [storeName, projects] of Object.entries(groupStore)) {
                console.log(storeName, projects);
                if(selectStoreName != storeName) {
                    continue;
                }
        
                const gbProjType = groupByProjType(projects as any);
        
                console.log(gbProjType);
        
                        
        
        
                $('#printArea').append(`
                    
                    <h1>≪見込み物件≫受注予定表（${storeName}）</h1>
                    <p>作成日：${createDate.format('YYYY年MM月DD日')}</p>`
        
                    
                    );
                
            }

        }
        console.log("selectChange", e);
    })

    $('#root').append(`
        <div id ="printArea"></div>
    `)

    


}