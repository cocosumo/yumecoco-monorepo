import $ from 'jquery';

const printButtonId = 'printButton';
/**
 * 印刷ボタンの生成
 * @returns ボタンのみ、cssと動作は別
 */
export const createPrintButton = () => {
  $('#custom_toolbar').append(`
    <button value='test' id="${printButtonId}">印刷</button>
  `);

  return $(`#${printButtonId}`);
};

export const getPrintButton = ()  => $(`#${printButtonId}`);