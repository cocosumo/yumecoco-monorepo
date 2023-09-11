import { getSelectMonth } from '../initialize/createToolbar/createSelectMonth';
import { getSelectStore } from '../initialize/createToolbar/createSelectStore';
import { getSelectWeek } from '../initialize/createToolbar/createSelectWeek';
import { getSelectYear } from '../initialize/createToolbar/createSelectYear';

/**
 * ツールバーのフォームの値を取得する
 * 
 * @returns
 * 
 * - year: 年
 * - month: 月
 * - store: 店舗
 * 
  */
export const getFormValues = () => {

  return {
    year: getSelectYear().val() as string,
    month: getSelectMonth().val() as string,
    store: getSelectStore().val() as string,
    week: getSelectWeek().val() as string,
  };
};