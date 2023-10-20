import { getSelectYear } from '../createToolbar/createSelectYear';

/**
 * 年セレクタの生成
 * 
 * デフォルトを当年にする
*/
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