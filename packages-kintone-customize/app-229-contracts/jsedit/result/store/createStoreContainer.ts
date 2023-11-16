import $ from 'jquery';
import { getPrintArea } from '../../initialize/createPrintArea';
import './createStoreContainer.css';
import DOMPurify from 'dompurify';


const storeContainerClass = 'store_container';
/**
 * 店舗ごとのコンテナを生成
 * @param storeId
 * @returns 生成された店舗コンテナ（div）への jQuery オブジェクト
*/
export const createStoreContainer = (storeId: string) => {

  // DOMでevent（店舗選択変更）による店舗コンテナのHTML要素を生成
  const sanitizedPrintArea = DOMPurify.sanitize(`<div class="${storeContainerClass}" id="${storeId}"></div>`);

  getPrintArea()
    .append(sanitizedPrintArea);

  return $(`#${storeId}`);
};