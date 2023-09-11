import { refreshResult } from '../result/refreshResult';
import { selectMonthId } from '../initialize/toolbar/createSelectMonth';
import { selectStoreId } from '../initialize/toolbar/createSelectStore';
import { selectYearId } from '../initialize/toolbar/createSelectYear';
import $ from 'jquery';

/**
 * フォームの変更によって結果を更新するトリガーを追加する
 * 
 * @returns {void}
 * 
 */
export const addResultRefreshTriggers = () => {
  $(`#${selectYearId}, #${selectMonthId}, #${selectStoreId}`)
    .on('change', refreshResult ) ;
};

