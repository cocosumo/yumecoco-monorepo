import moment from "moment";
import { getGroupByStore } from "./getGroupByStore";
import { groupByProjType } from "./groupByProjType";
import $ from 'jquery';
import { formatCurrency } from "../../../../jsedit/api/formatCurrency";
import { calcFontSize } from "../../../../jsedit/api/calcFontSize";
import parseISO from "date-fns/parseISO";
import format from "date-fns/format";


export const displayResult = async (selectStoreName?: string) => {
    const groupStore = await getGroupByStore();

    //console.log(groupStore);

    const today = moment().format('YYYY年MM月DD日');  //作成日の表示

    $('#printArea').empty(); //選択時一覧をリセット

    let totalPrice = 0;   

    for(const [storeName, projects] of Object.entries(groupStore)) {
        //console.log('selectStoreName',selectStoreName, storeName, projects);

        if(selectStoreName != storeName && selectStoreName !== undefined) {
           continue;
        } 
        

        const gbProjType = groupByProjType(projects as any);

        //console.log(gbProjType);

        const projectNames = [
            '新築工事',
            'リフォーム工事',
            '新築付帯工事',
            '太陽光',
            '蓄電池'
        ];
        //console.log(storeName, gbProjType['新築付帯工事'], gbProjType);

        

        const contentsTable = projectNames.map((pn) => {
            //console.log('店舗名', storeName, pn, gbProjType[pn]);

           // console.log(gbProjType[pn]);
            const projByType = gbProjType[pn] as any[];

            let totalSchedContractPrice = 0;
            
            const contentsRows = projByType?.map((ob, index) => {

                const number = +ob.schedContractPrice.value;
                totalSchedContractPrice += number;

                const totalnumber = +totalSchedContractPrice;
                totalPrice += totalnumber;

                if(ob === undefined) {
                    return;
                }
                //　抽出結果を出力
                return `<tr class="dataContents" data-uuid="${ob.uuid?.value}">
                    <td id="number" style="text-align: center;">${index +1}</td>
                    <td id="rank" style="text-align: center;">${ob.rank?.value || "-"}</td>
                    <td id="custNamefield" style="font-size: ${calcFontSize(150, ob.custNames?.value)}px;">${ob.custNames?.value}</td>
                    <td style="text-align: right;">${formatCurrency(ob.schedContractPrice?.value) || "未定"}</td>
                    <td style="text-align: center;">${ob.paymentMethod?.value}</td>
                    <td class="agName" style="text-align: center;">${ob.cocoAGNames?.value}</td>
                    <td class="agName" style="text-align: center;">${ob.yumeAGNames?.value}</td>
                    <td class="date" style="text-align: center;">${format(parseISO(ob.estatePurchaseDate?.value),'yy.M.d')  || ""}</td>
                    <td class="date" style="text-align: center;">${format(parseISO(ob.planApplicationDate?.value),'yy.M.d') || ""}</td>
                    <td class="date" style="text-align: center;">${format(parseISO(ob.schedContractDate?.value),'yy.M.d') || ""}</td>
                    <td style="text-align: left;">${ ob.memo?.value || ""}</td>
                </tr>`

            }).filter(Boolean).join("");

           // console.log('contentsRows', contentsRows);

            return `<div class="prospectTableContainer">
            <table class="prospectTable">
            <thead>
                <tr>
                    <td class="projNameHeader" colspan="11">${pn}</td>
                </tr>
                <tr class="contractHeader">
                    <th id="numberIndex" style="width: 20px;">No.</th>
                    <th id="rankIndex" style="width: 20px;">ランク</th>
                    <th style="width: 150px;">お客様名</th>
                    <th style="width: 150px;">契約<br/>予定金額</th>
                    <th style="width: 100px;">金融機関</th>
                    <th style="width: 80px;">担当者</th> 
                    <th style="width: 80px;">AG</th>
                    <th style="width: 80px;">不動産<br/>決済日</th>
                    <th style="width: 80px;">設計<br/>申込日</th>
                    <th style="width: 80px;">契約<br/>予定日</th>
                    <th style="width: 200px;">備考</th>   
                </tr>
            </thead>
            <tbody class="prospectContents">
                ${contentsRows || '<tr><td class="unknown" colspan="11">なし</td></tr>'}
                
            </tbody>
            <tfoot>
                <tr class="totalCell">
                    <td colspan="3">小計</td>
                    <td colspan="8">${formatCurrency(totalSchedContractPrice)}</td>
                </tr>
            </tfoot>
            </table>
            </div>`
            
            
        }).join("");

        

        //一覧表示（全て）
        $('#printArea').append(`
            <div class="printContainer">
                <h1 id="prospectTitle">≪見込み物件≫受注予定表（${storeName}）</h1>
                <p id="prospectDate">作成日：${today}</p>
                    <div class="tableContainer">
                        ${contentsTable}
                        
                        <table class="totalTable">
                            <tr>
                                <td class="allTotalCell">総合計</td>
                                <td>${formatCurrency(totalPrice)}</td>
                            </tr>
                        </table>
                            <p id="memo">【ランク】 A：設計契約済み 又は、契約確実　B：多分契約できる　C：交渉中　D：未定</p>
                        
                    </div>
            </div>

            
            `);

              
    }

    
    //一覧を選択したら該当ぺージに遷移
    $('.prospectContents').on(
        'click',
        (event) => {
        console.log(event);
        const clickedRow = $((event as any).target).closest('tr');
        const uuid = clickedRow.data("uuid");
        //console.log(uuid);
        
        //遷移先
        const url = `https://rdmuhwtt6gx7.cybozu.com/k/149/#/project/edit/v2?projId=${uuid}`;
        console.log(url);
        window.open(url, '_blank');
    });
    

}