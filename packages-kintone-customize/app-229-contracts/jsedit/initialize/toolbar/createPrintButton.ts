import $ from 'jquery';

const printButtonId = 'printButton';

export const createPrintButton = () => {
  $('#custom_toolbar').append(`
    <button id="${printButtonId}">印刷</button>
  `);

  return $(`#${printButtonId}`);
};

export const getPrintButton = ()  => $(`#${printButtonId}`);