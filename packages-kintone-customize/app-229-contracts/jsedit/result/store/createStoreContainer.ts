import $ from 'jquery';
import { getPrintArea } from '../../initialize/createPrintArea';
import './createStoreContainer.css';
const storeContainerClass = 'store_container';

export const createStoreContainer = (storeId: string) => {
  getPrintArea()
    .append(`<div class="${storeContainerClass}" id="${storeId}"></div>`);

  return $(`#${storeId}`);
};