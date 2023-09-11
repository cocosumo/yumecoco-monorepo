import { createSelect } from './createSelect';
import $ from 'jquery';

export const selectYearId = 'selectYear';
export const createSelectYear = () => {
  const $select = createSelect(selectYearId, '年');

  const year = new Date().getFullYear();
  const maxYear = year + 1;
  
  for (let i = maxYear; i > maxYear - 4; i--) {
    $select
      .append(`
        <option value="${i}">${i}</option>
      `);
  }

  // default is current year
  $select.val(year);

};

export const getSelectYear = () => $(`#${selectYearId}`);