import { getWeekDates } from '../api/getWeekDates';
import { getSelectWeek } from '../initialize/createToolbar/createSelectWeek';

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

  getSelectWeek()
    .empty()
    .append(weekOptions.join(''));
};