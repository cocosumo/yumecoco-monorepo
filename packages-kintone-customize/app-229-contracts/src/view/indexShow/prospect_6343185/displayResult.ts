import { getGroupByStore } from './getGroupByStore';
import { groupByProjType } from './groupByProjType';
import $ from 'jquery';
import { formatCurrency } from '../../../../jsedit/api/formatCurrency';
import { calcFontSize } from '../../../../jsedit/api/calcFontSize';
import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';

//表の中身の生成

export const displayResult = async (selectStoreName?: string) => {
  const groupStore = await getGroupByStore();

  //console.log(groupStore);

  //const today = moment().format('YYYY年MM月DD日');  //作成日の表示

  //作成日の表示（moment不使用ver）
  const today = new Date().toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
      
      

  $('#prospect_printArea').empty(); //選択時一覧をリセット

  let totalPrice = 0;   

  //店舗と工事名称でグループ
  for (const [storeName, projects] of Object.entries(groupStore)) {
    //console.log('selectStoreName', selectStoreName, storeName, projects);

    if (selectStoreName != storeName && selectStoreName !== undefined) {
      continue;
    } 
        

    const gbProjType = groupByProjType(projects as any);

    //console.log(gbProjType);

    //表示する工事名称を指定（工事種別と一致させる）
    const projectNames = [
      '新築工事',
      'リフォーム工事',
      '新築付帯工事',
      '太陽光',
      '蓄電池',
    ];
    //console.log(storeName, gbProjType['新築付帯工事'], gbProjType);

    const contentsTable = [];

    for (const pn of projectNames) {
      //console.log('店舗名', storeName, pn, gbProjType[pn]);

      // console.log(gbProjType[pn]);
      const projByType = gbProjType[pn] as any[];

      //総計をリセット
      let totalSchedContractPrice = 0;

      const contentsRows = [];
      let index = 0;

      if (projByType) {

        for (const ob of projByType) {
          //console.log('ob.estatePurchaseDate', ob.estatePurchaseDate?.value);
          //console.log('formattedDate', format(parseISO(ob.estatePurchaseDate?.value), 'yy.M.d'));
  
          //小計の計算（契約予定金額を合計）
          const number = +(ob.schedContractPrice?.value || 0);
          totalSchedContractPrice += number;
  
          //総計の計算（小計を合計）
          const totalnumber = +totalSchedContractPrice;
          totalPrice += totalnumber;
  
          if (ob === undefined) {
            continue;
          }
  
          //　抽出結果を出力
          contentsRows.push(`<tr class="prospect_dataContents" data-uuid="${ob.uuid?.value}">
                      <td id="prospect_number" style="text-align: center;">${index + 1}</td>
                      <td id="prospect_rank" style="text-align: center;">${ob.rank?.value || '-'}</td>
                      <td id="prospect_custNamefield" style="font-size: ${calcFontSize(150, ob.custNames?.value)}px;">${ob.custNames?.value}</td>
                      <td style="text-align: right;">${ob.schedContractPrice?.value ? formatCurrency(ob.schedContractPrice?.value) : '未定'}</td>
                      <td style="text-align: center;">${ob.paymentMethod?.value}</td>
                      <td class="prospect_agName" style="text-align: center;">${ob.cocoAGNames?.value}</td>
                      <td class="prospect_agName" style="text-align: center;">${ob.yumeAGNames?.value}</td>
                      <td class="prospect_date" style="text-align: center;">${ob.estatePurchaseDate?.value ? format(parseISO(ob.estatePurchaseDate?.value), 'yy.M.d') : ''}</td>
                      <td class="prospect_date" style="text-align: center;">${ob.planApplicationDate?.value ? format(parseISO(ob.planApplicationDate?.value), 'yy.M.d') : ''}</td>
                      <td class="prospect_date" style="text-align: center;">${ob.schedContractDate?.value ? format(parseISO(ob.schedContractDate?.value), 'yy.M.d') : ''}</td>
  
                      <td style="text-align: left;">${ ob.memo?.value || ''}</td>
                  </tr>`);
          index++;
        }
      } else {
        contentsRows.push('<tr><td class="prospect_unknown" colspan="11">なし</td></tr>');
      }
      

      //表の生成
      contentsTable.push(`<div class="prospectTableContainer">
            <table class="prospectTable">
            <thead>
                <tr>
                    <td class="prospect_projNameHeader" colspan="11">${pn}</td>
                </tr>
                <tr class="prospect_contractHeader">
                    <th id="prospect_numberIndex" style="width: 20px;">No.</th>
                    <th id="prospect_rankIndex" style="width: 20px;">ランク</th>
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
                ${contentsRows.join('') || '<tr><td class="prospect_unknown" colspan="11">なし</td></tr>'}
                
            </tbody>
            <tfoot>
                <tr class="prospect_totalCell">
                    <td colspan="3">小計</td>
                    <td colspan="8">${formatCurrency(totalSchedContractPrice)}</td>
                </tr>
            </tfoot>
            </table>
            </div>`);

    }
              
        
    /* //工事種別ごとで表作成
    const contentsTable = projectNames.map((pn) => {
      //console.log('店舗名', storeName, pn, gbProjType[pn]);

      // console.log(gbProjType[pn]);
      const projByType = gbProjType[pn] as any[];

      //総計をリセット
      let totalSchedContractPrice = 0;
            
      const contentsRows = projByType?.map((ob, index) => {
                
        //小計の計算（契約予定金額を合計）
        const number = +(ob.schedContractPrice?.value || 0);
        totalSchedContractPrice += number;

        //総計の計算（小計を合計）
        const totalnumber = +totalSchedContractPrice;
        totalPrice += totalnumber;

        if (ob === undefined) {
          return;
        }

        console.log('ob.estatePurchaseDate', ob.estatePurchaseDate?.value);
        //console.log('formattedDate', format(parseISO(ob.estatePurchaseDate?.value), 'yy.M.d'));

        //　抽出結果を出力
        return `<tr class="prospect_dataContents" data-uuid="${ob.uuid?.value}">
                    <td id="prospect_number" style="text-align: center;">${index + 1}</td>
                    <td id="prospect_rank" style="text-align: center;">${ob.rank?.value || '-'}</td>
                    <td id="prospect_custNamefield" style="font-size: ${calcFontSize(150, ob.custNames?.value)}px;">${ob.custNames?.value}</td>
                    <td style="text-align: right;">${ob.schedContractPrice?.value ? formatCurrency(ob.schedContractPrice?.value) : '未定'}</td>
                    <td style="text-align: center;">${ob.paymentMethod?.value}</td>
                    <td class="prospect_agName" style="text-align: center;">${ob.cocoAGNames?.value}</td>
                    <td class="prospect_agName" style="text-align: center;">${ob.yumeAGNames?.value}</td>
                    <td class="prospect_date" style="text-align: center;">${ob.estatePurchaseDate?.value ? format(parseISO(ob.estatePurchaseDate?.value), 'yy.M.d') : ''}</td>
                    <td class="prospect_date" style="text-align: center;">${ob.planApplicationDate?.value ? format(parseISO(ob.planApplicationDate?.value), 'yy.M.d') : ''}</td>
                    <td class="prospect_date" style="text-align: center;">${ob.schedContractDate?.value ? format(parseISO(ob.schedContractDate?.value), 'yy.M.d') : ''}</td>

                    <td style="text-align: left;">${ ob.memo?.value || ''}</td>
                </tr>`;

      }).filter(Boolean)
        .join(''); */

    //console.log('contentsRows', contentsRows);

    //表の生成
    /*  return `<div class="prospectTableContainer">
            <table class="prospectTable">
            <thead>
                <tr>
                    <td class="prospect_projNameHeader" colspan="11">${pn}</td>
                </tr>
                <tr class="prospect_contractHeader">
                    <th id="prospect_numberIndex" style="width: 20px;">No.</th>
                    <th id="prospect_rankIndex" style="width: 20px;">ランク</th>
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
                ${contentsRows || '<tr><td class="prospect_unknown" colspan="11">なし</td></tr>'}
                
            </tbody>
            <tfoot>
                <tr class="prospect_totalCell">
                    <td colspan="3">小計</td>
                    <td colspan="8">${formatCurrency(totalSchedContractPrice)}</td>
                </tr>
            </tfoot>
            </table>
            </div>`;
            
            
    }).join(''); */

        

    //一覧表示（全て）
    $('#prospect_printArea').append(`
            <div class="prospect_printContainer">
                <h1 id="prospectTitle">≪見込み物件≫受注予定表（${storeName}）</h1>
                <p id="prospectDate">作成日：${today}</p>
                    <div class="prospect_tableContainer">
                        ${contentsTable.join('')}
                        
                        <table class="prospect_totalTable">
                            <tr>
                                <td class="prospect_allTotalCell">総合計</td>
                                <td>${formatCurrency(totalPrice)}</td>
                            </tr>
                        </table>
                            <p id="prospect_memo">【ランク】 A：設計契約済み 又は、契約確実　B：多分契約できる　C：交渉中　D：未定</p>
                        
                    </div>
            </div>

            
            `);

              
  }


  //一覧を選択したら該当ぺージに遷移
  $('.prospectContents').on(
    'click',
    (event) => {
      //console.log(event);
      const clickedRow = $((event as any).target).closest('tr');
      const uuid = clickedRow.data('uuid');
      //console.log(uuid);

      if (!uuid) return;
        
      //遷移先（ココアス工事登録）
      const url = `https://rdmuhwtt6gx7.cybozu.com/k/149/#/project/edit/v2?projId=${uuid}`;
      //console.log(url);
      window.open(url, '_blank');
    },
  );
    

};