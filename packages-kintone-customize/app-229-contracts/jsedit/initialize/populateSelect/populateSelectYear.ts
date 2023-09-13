import { getSelectYear } from '../createToolbar/createSelectYear';

export const populateSelectYear = async () => {

  const $select = getSelectYear();

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