import { createSelect } from './createSelect';

export const selectMonthId = 'selectMonth';

export const createSelectMonth = () => {
  
  const $select = createSelect(selectMonthId, '月');

  for (let i = 1; i <= 12; i++) {
    $select
      .append(`
        <option value="${i}">${i}月</option>
      `);
  }

  // default is current month
  $select.val(new Date().getMonth() + 1);

};