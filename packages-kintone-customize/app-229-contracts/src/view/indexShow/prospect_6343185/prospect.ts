import moment from "moment";
import { createSelect } from "../../../../jsedit/initialize/createToolbar/createSelect";
import { getGroupByStore } from "./getGroupByStore";
import { groupByProjType } from "./groupByProjType";
import $ from 'jquery';

export const prospect = async () => {
    console.log("見込み一覧、開始しました");

    const groupStore = await getGroupByStore();

    console.log(groupStore);

    const select = createSelect();
        const createDate = moment();
    

    for(const [storeName, projects] of Object.entries(groupStore)) {
        console.log(storeName, projects);

        const gbProjType = groupByProjType(projects as any);

        console.log(gbProjType);

        




        $('#root').append(`
            <h1>≪見込み物件≫受注予定表（${storeName}）</h1>
            <p>作成日：${createDate.format('YYYY年MM月DD日')}</p>`

            
            
            
            );
        
    }


}