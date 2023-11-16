import $ from 'jquery';
import moment from 'moment';
import { getFormValues } from '../../../api/getFormValues';
import { getWeekDates } from '../../../api/getWeekDates';

/**
 * 選択された週に該当する行をハイライトする
 * - 現在のフォームから選択した週の情報を取得
 * - テーブル内の該当行をハイライト表示する
 */
export const hightlightRowsByWeek = () => {
  const {
    year: selectedYear,
    month: selectedMonth,
    week: selectedWeek,
  } = getFormValues();

  const $rows = $('.table_contracts_list tbody tr');

  // すべての行からハイライトクラスを削除（リセット）
  $rows.removeClass('highlight');

  if (!selectedYear || !selectedMonth || !selectedWeek) {
    return;
  }

  // 選択された年と月に対応する週の情報を取得
  const weeks = getWeekDates(+selectedYear, +selectedMonth);


  $rows
    .each((i, tr) => {
      // return true if 4th column is within the week index
      // 契約日（4列目）を取得
      const contractDate = $(tr).find('td')
        .eq(4)
        .text();

      const date = moment(contractDate);

      // 選択した週に該当する行をハイライト
      const isWithinWeek = weeks.some((week, index) => {

        if (index === +selectedWeek) {
          const isWithin = date.isBetween(week.startDate, week.endDate, undefined, '[]');
          return isWithin;
        }
        return false;
      });

      if (isWithinWeek) {

        // if element does not contain any class containing 'highlight' string, add highlight class
        // ハイライトクラス を持たない行に ハイライトクラス を追加
        if (!$(tr)
          .attr('class')
          ?.includes('highlight')
        ) {
          $(tr)
            .addClass('highlight');
        }
      }
    });

};