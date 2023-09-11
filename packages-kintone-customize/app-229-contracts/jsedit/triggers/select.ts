import { refreshResult } from '../result/refreshResult';
import { selectMonthId } from '../initialize/createToolbar/createSelectMonth';
import { selectStoreId } from '../initialize/createToolbar/createSelectStore';
import { selectYearId } from '../initialize/createToolbar/createSelectYear';
import $ from 'jquery';
import { getSelectWeek } from '../initialize/createToolbar/createSelectWeek';
import { hightlightRowsByWeek } from '../result/store/createContractList/highlightRowsByWeek';

/**
 * フォームの変更によって結果を更新するトリガーを追加する
 * 
 * @returns {void}
 * 
 */
export const addResultRefreshTriggers = () => {
  $(`#${selectYearId}, #${selectMonthId}, #${selectStoreId}`)
    .on('change', async () => {
      await refreshResult();
      hightlightRowsByWeek();
    }) ;
};

/**
 * 週の選択によって行をハイライトするトリガーを追加する
 * 
 */
export const addWeekHighlightTriggers = () => {
  getSelectWeek()
    .on('change', hightlightRowsByWeek);
};

