import { createPrintButton } from './createPrintButton';
import { createSelectYear } from './createSelectYear';
import { createSelectMonth } from './createSelectMonth';
import { createSelectStore } from './createSelectStore';
import { getRootElement } from '../../api/getRootElement';

/**
 * ツールバーの初期化
 */
export const toolbarInit = async () => {
  getRootElement()
    .append(`
    <div id="custom_toolbar"/>
  `);

  createSelectYear();
  createSelectMonth();

  await createSelectStore();

  createPrintButton();

};