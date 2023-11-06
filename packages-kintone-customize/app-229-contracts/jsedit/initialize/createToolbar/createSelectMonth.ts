import { createSelect } from './createSelect';
import $ from 'jquery';


export const selectMonthId = 'selectMonth';
/**
 * 月リストの生成（1 から 12）
 */
export const createSelectMonth = () => {
  //選択肢内のparams(id , label)を定義 - createSelect
  createSelect(selectMonthId, '月');
};

export const getSelectMonth = () => $(`#${selectMonthId}`);