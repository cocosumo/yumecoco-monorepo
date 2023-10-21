import { getWeekDates } from '../api/getWeekDates';
import { getSelectWeek } from '../initialize/createToolbar/createSelectWeek';
/**
 * ハイライト選択の生成
 * @returns '第○週'
*/
export const createHightlightOptions = (
  year: number,
  month: number,
) => {

  const weeks = getWeekDates(year, month);

  const weekOptions = weeks
    .map((_, index) => {
      return `<option value="${index}">第${index + 1}週</option>`;
    });
  weekOptions.unshift('<option value="">-</option>');

  const $selectWeek = getSelectWeek();

  const selectWeekValue = $selectWeek.val() as string;


  $selectWeek
    .empty()
    .append(weekOptions.join(''));


  if (selectWeekValue) {

    if ((weeks.length - 1) < +selectWeekValue) {
      // 月の週数より大きい値が選択されていたら、最後の週を選択する
      $selectWeek.val(String(weeks.length - 1));
    } else {
      // それ以外はそのまま
      $selectWeek.val(selectWeekValue);
    }
  }
};