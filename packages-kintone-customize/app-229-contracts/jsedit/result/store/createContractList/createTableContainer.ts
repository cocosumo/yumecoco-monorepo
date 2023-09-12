export const createTableContainer = ($el: JQuery<HTMLElement>) => {
  $el.append(`<table class="table_contracts_list">
    <thead>
      <tr>
              
        <th style="width: 30px;">
          件数
        </th>
        <th style="width: 80px;">工事種別</th>
        <th style="width: 150px;">発注者</th>
        <th style="width: 200px;">工事名</th>
        <th style="width: 80px;">契約日</th>
        <th>契約金額(税込)</th>
        <th>粗利金額(税抜)</th>
        <th>粗利金額(税抜)</th> 
        <th>粗利金額(税込)</th>       <!-- フィールド内は税抜きのためprofit*1.1すること -->
        <th>夢てつ入金(税込)</th>
        <th style="width: 70px;">総粗利率</th>
        <th>AG1</th>
        <th>AG2</th>
      </tr> 
    </thead>
    <tbody>

    </tbody>
  
  </table>`);

  // Return the new table
  return $el.find('table').last();
};