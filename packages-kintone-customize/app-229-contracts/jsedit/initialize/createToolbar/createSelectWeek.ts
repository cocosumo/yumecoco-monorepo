import { createSelect } from './createSelect';
import $ from 'jquery';


export const selectWeekId = 'selectWeek';

/**
 * 「第n週」セレクタの生成
 * ゆめてつ紹介料で使用、該当週をハイライトする。
*/
export const createSelectWeek = async () => {
  //選択肢内のparams(id , label)を定義 - createSelect
  createSelect(selectWeekId, 'ハイライト');

};

export const getSelectWeek = () => $(`#${selectWeekId}`);