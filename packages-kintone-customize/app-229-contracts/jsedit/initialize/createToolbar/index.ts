import { createPrintButton } from './createPrintButton';
import { createSelectYear } from './createSelectYear';
import { createSelectMonth } from './createSelectMonth';
import { createSelectStore } from './createSelectStore';
import { getRootElement } from '../../api/getRootElement';
import './index.css';
import { createSelectWeek } from './createSelectWeek';


/**
 * ツールバーの初期化
 */
export default function () {
  getRootElement()
    .append(`
    <div id="custom_toolbar"/>
  `);

  createSelectYear();

  createSelectMonth();

  createSelectStore();

  createSelectWeek();
  
  createPrintButton();

}