//表枠の生成
//不使用

export const createTable = ($el: JQuery<HTMLElement>) => {
    $el.append(`<table class="table_prospect_list" border="1">
        <thead id="prospectProj"></thead> <!-- 工事種別名 -->
        <thead>
            <tr>
                <th style="width: 15px;">No.</th> <!-- index -->
                <th style="width: 30px;">ランク</th>
                <th style="width: 100px;">お客様名</th>
                <th>契約予定金額</th>
                <th>金融機関</th>
                <th>担当者</th>          <!-- ここすも営業 -->
                <th>エージェント</th>    <!-- ゆめてつAG -->
                <th>不動産決済日</th>
                <th>設計申込日</th>
                <th>契約予定日</th>
                <th>備考</th>   
            </tr>
        </thead>
        <tbody>
            <td></td>
            <td>小計</td>
        </tbody>
    </table>`);

    return $el.find('table').last();
}