import $ from 'jquery';
import { getPrintArea } from '../../initialize/createPrintArea';
import './createStoreContainer.css';
import DOMPurify from 'dompurify';


const storeContainerClass = 'store_container';

export const createStoreContainer = (storeId: string) => {

  const sanitizedPrintArea = DOMPurify.sanitize(`<div class="${storeContainerClass}" id="${storeId}"></div>`);

  getPrintArea()
    .append(sanitizedPrintArea);

  return $(`#${storeId}`);
};