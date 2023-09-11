export const createTableContainer = ($el: JQuery<HTMLElement>) => {
  $el.append(`<table class="table_weekly_result">
   <thead>
      <tr>
        <th>ゆめてつ契約分</th> <!-- 空セル -->
        <th>契約金額</th>
        <th>粗利金額(税抜)</th>
        <th>粗利金額(税込)</th>
        <th id="weekFee">夢てつ入金(税込)</th>
        <th id="WeekNumberSum">件数</th>
      </tr>
    </thead>
    <tbody>

    </tbody>
  
  </table>`);

  // Return the new table
  return $el.find('table').last();
};