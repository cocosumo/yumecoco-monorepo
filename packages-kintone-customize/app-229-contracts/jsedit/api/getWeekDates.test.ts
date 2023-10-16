import { describe, it } from '@jest/globals';
import { getWeekDates } from './getWeekDates';
//テスト
//渡された年と月の週の範囲を確認する
describe('getWeeks', () => {

  it('渡された年と月の週の範囲を確認する', () => {
    const result = getWeekDates(2023, 7);
    console.log(result);
  });

});