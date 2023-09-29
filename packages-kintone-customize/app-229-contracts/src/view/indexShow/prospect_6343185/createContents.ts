import $ from 'jquery';

//店舗選択の生成
export const createSelect = (
  id: string,
  label: string,
) => {

  $('#selectBox')
    .append(`
   <label for="${id}">　${label}：
      <select id="${id}"></select>
   </label>
  `);

  return $(`#${id}`);
};