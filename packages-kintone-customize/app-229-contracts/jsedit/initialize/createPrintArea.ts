import { getRootElement } from '../api/getRootElement';
import $ from 'jquery';
import './createPrintArea.css';

export const printAreaId = 'printArea';

/**
 * 印刷エリアの指定
 * @param id printArea
*/
export const createPrintArea = () => {
  getRootElement()
    .append(`
    <div id="printArea" />
  `);
};

export const getPrintArea = () => $(`#${printAreaId}`);