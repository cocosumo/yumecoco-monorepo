import $ from 'jquery';
import { createPrintButton } from './createPrintButton';
import { createSelectYear } from './createSelectYear';
import { createSelectMonth } from './createSelectMonth';
import { createSelectStore } from './createSelectStore';

/**
 * ツールバーの初期化
 */
export const toolbarInit = async () => {
  $('#root')
    .append(`
    <div id="custom_toolbar"/>
  `);

  createSelectYear();
  createSelectMonth();

  await createSelectStore();

  createPrintButton();

};