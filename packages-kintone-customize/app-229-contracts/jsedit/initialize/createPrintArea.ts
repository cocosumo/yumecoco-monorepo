import { getRootElement } from '../api/getRootElement';
import $ from 'jquery';

export const printAreaId = 'printArea';

export const createPrintArea = () => {
  getRootElement()
    .append(`
    <div id="printArea" />
  `);
};

export const getPrintArea = () => $(`#${printAreaId}`);