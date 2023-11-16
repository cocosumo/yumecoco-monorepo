import { createSelect } from './createSelect';
import $ from 'jquery';


export const selectStoreId = 'selectStore';
/**
 * 店舗リストの生成
 * jquery
*/
export const createSelectStore = () => {
  //選択肢内のparams(id , label)を定義 - createSelect
  const $select = createSelect(selectStoreId, '店舗');

  // side effect: save value to local storage
  // サイドエフェクト: 選択した値をローカルストレージに保存 - localStorage
  $select.on('change', (e) => {
    const value = $(e.target).val() as string;
    localStorage.setItem(selectStoreId, value);
  });
};

export const getSelectStore = () => $(`#${selectStoreId}`);