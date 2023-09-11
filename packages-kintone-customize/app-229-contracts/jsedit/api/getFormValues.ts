import { getSelectMonth } from '../initialize/toolbar/createSelectMonth';
import { getSelectStore } from '../initialize/toolbar/createSelectStore';
import { getSelectYear } from '../initialize/toolbar/createSelectYear';

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
  };
};