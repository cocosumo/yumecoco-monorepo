import $ from 'jquery';
import { getPrintArea } from '../../initialize/createPrintArea';

const storeContainerClass = 'store_container';

export const createStoreContainer = (storeId: string) => {
  getPrintArea()
    .empty()
    .append(`<div class="${storeContainerClass}" id="${storeId}"></div>`);

  return $(`#${storeId}`);
};