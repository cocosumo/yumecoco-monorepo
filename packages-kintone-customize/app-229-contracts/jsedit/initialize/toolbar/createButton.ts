import $ from 'jquery';


export const createPrintButton = () => {
  $('#custom_toolbar').append(`
    <button id="printButton">印刷</button>
  `);
};