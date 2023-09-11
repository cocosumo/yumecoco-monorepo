import $ from 'jquery';


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