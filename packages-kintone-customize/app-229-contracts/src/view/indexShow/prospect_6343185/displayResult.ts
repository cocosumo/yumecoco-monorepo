import moment from "moment";
import { getGroupByStore } from "./getGroupByStore";
import { groupByProjType } from "./groupByProjType";
import $ from 'jquery';
import { formatCurrency } from "../../../../jsedit/api/formatCurrency";
import { calcFontSize } from "../../../../jsedit/api/calcFontSize";


export const displayResult = async (selectStoreName?: string) => {
    const groupStore = await getGroupByStore();

    //console.log(groupStore);

    const today = moment().format('YYYY年MM月DD日');  //作成日の表示

    $('#printArea').empty();

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

                return `<tr data-uuid="${ob.uuid?.value}">
                    <td style="text-align: center;">${index +1}</td>
                    <td style="text-align: center;">${ob.rank?.value || "-"}</td>
                    <td style="font-size: ${calcFontSize(150, ob.custNames?.value)}px;">${ob.custNames?.value}</td>
                    <td style="text-align: right;">${formatCurrency(ob.schedContractPrice?.value) || "未定"}</td>
                    <td style="text-align: center;">${ob.paymentMethod?.value}</td>
                    <td style="text-align: center;">${ob.cocoAGNames?.value}</td>
                    <td style="text-align: center;">${ob.yumeAGNames?.value}</td>
                    <td style="text-align: center;">${ob.estatePurchaseDate?.value || ""}</td>
                    <td style="text-align: center;">${ob.planApplicationDate?.value || ""}</td>
                    <td style="text-align: center;">${ob.schedContractDate?.value || ""}</td>
                    <td style="text-align: left;">${ob.memo?.value || ""}</td>
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
                    <th>No.</th> <!-- index -->
                    <th>ランク</th>
                    <th style="width: 100px;">お客様名</th>
                    <th style="width: 60px;">契約予定金額</th>
                    <th>金融機関</th>
                    <th>担当者</th>          <!-- ここすも営業 -->
                    <th>エージェント</th>    <!-- ゆめてつAG -->
                    <th>不動産決済日</th>
                    <th>設計申込日</th>
                    <th>契約予定日</th>
                    <th style="width: 150px;">備考</th>   
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

    $('.prospectContents').click((event) => {
        console.log(event);
        const clickedRow = $((event as any).target).closest('tr');
        const uuid = clickedRow.data("uuid");
        //console.log(uuid);
        const url = `https://rdmuhwtt6gx7.cybozu.com/k/149/#/project/edit/v2?projId=${uuid}`;
        console.log(url);
        window.open(url, '_blank');
    })
    

}