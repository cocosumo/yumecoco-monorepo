import $ from 'jquery';

const printButtonId = 'printButton';

export const createPrintButton = () => {
  $('#custom_toolbar').append(`
    <button value='test' id="${printButtonId}">印刷</button>
  `);

  return $(`#${printButtonId}`);
};

export const getPrintButton = ()  => $(`#${printButtonId}`);