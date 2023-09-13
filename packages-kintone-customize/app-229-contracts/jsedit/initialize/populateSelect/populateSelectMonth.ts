import { getSelectMonth } from '../createToolbar/createSelectMonth';

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