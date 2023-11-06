import $ from 'jquery';

/**
 * 選択プルダウンの生成
 * jquery
 * @param id - param1：選択肢で出現させたい要素を指定（string）
 * @param label - param2：ラベル名を指定（string）
 * @returns 空の選択BOX
 */
export const createSelect = (
  id: string,
  label: string,
) => {

  $('#custom_toolbar')
    .append(`
   <label for="${id}">　${label}：
      <select id="${id}"></select>
   </label>
  `);

  return $(`#${id}`);
};