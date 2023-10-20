import { getSelectMonth } from '../createToolbar/createSelectMonth';

/**
 * 月セレクタの生成（1月 から 12月）
 * 
 * デフォルトを当月にする
*/
export const populateSelectMonth = () => {
  const $select = getSelectMonth();

  for (let i = 1; i <= 12; i++) {
    $select
      .append(`
        <option value="${i}">${i}月</option>
      `);
  }

  // default is current month
  $select.val(new Date().getMonth() + 1);
};