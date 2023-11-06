import moment from 'moment';
import { getFormValues } from '../../../api/getFormValues';
import { getWeekDates } from '../../../api/getWeekDates';
/**
 * 週次計算テーブル 一覧中身
 * @param $el - 週次計算テーブルを含む要素
 * @param records - テーブルに表示するデータの配列
*/
export const createTableContents = ($el: JQuery<HTMLElement>, records: DB.SavedRecord[]) => {
  const {
    year,
    month,
  } = getFormValues();

  // 選択した年と月に対応する週の情報を取得
  const weeks = getWeekDates(+year, +month); 

  // 週ごとの合計
  weeks.forEach((w, index) => {
    let totalContractAmountIntax = 0; // --契約金額(税込)
    let totalProfitInclTax = 0; // --------税込粗利額
    let totalProfitExclTax = 0; // --------粗利額
    let totalFee = 0; // ------------------紹介料
    let totalCount = 0; // ----------------件数

    // 週に対応するレコードをフィルタリング
    const thisWeekRecords = records
      .filter(({
        contractDate,
      }) => {
        const date = moment(contractDate.value);
        return date.isBetween(w.startDate, w.endDate, undefined, '[]');
      });

    // レコードの集計
    // ゆめてつAGがなし、もしくは「ここすも」「山豊工建」「デイライフ㈱」の場合はカウントしない
    for (const rec of thisWeekRecords) {
      if (rec.yumeAGName.value === ''
       || rec.yumeAGName.value === 'ここすも'
       || rec.yumeAGName.value === '山豊工建'
       || rec.yumeAGName.value === 'デイライフ㈱'
       ) continue;

      totalContractAmountIntax += parseFloat(rec.contractAmountIntax.value);
      totalProfitExclTax += parseFloat(rec.profit.value);
      totalProfitInclTax +=  parseFloat(rec.profit.value) * 1.1;
      totalFee += parseFloat(rec.commission.value);
      totalCount++;
    }

    //週次合計を転記
    $el.find('tbody').append(`
      <tr>
        <td >第${index + 1}週：${moment(w.startDate).format('M/D')}～${moment(w.endDate).format('M/D')}</td>
        <td style="text-align: right;">${totalContractAmountIntax.toLocaleString()}</td>
        <td style="text-align: right;">${ totalProfitExclTax.toLocaleString()}</td>
        <td style="text-align: right;">${Math.round(totalProfitInclTax).toLocaleString() }</td>
        <td style="text-align: right;">${totalFee.toLocaleString()}</td>
        <td style="text-align: center;">${totalCount}</td>
    </tr>
    `);
  });
};