import { createSelect } from './createSelect';
import $ from 'jquery';

export const selectYearId = 'selectYear';
/**
 * 年リストの生成
 * jquery
*/
export const createSelectYear = () => {
  //選択肢内のparams(id , label)を定義 - createSelect
  createSelect(selectYearId, '年');
};

export const getSelectYear = () => $(`#${selectYearId}`);