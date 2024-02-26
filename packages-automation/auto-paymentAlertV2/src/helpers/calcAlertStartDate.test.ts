import { describe, it, expect } from '@jest/globals';
import { calcAlertStartDate } from './calcAlertStartDate';
import format from 'date-fns/format';


describe('calcAlertStartDate', () => {
  it('支払予定日から計算した日付が返ってくること', () => {

    const result = calcAlertStartDate({
      expectedPaymentDate: '2023-11-05',
      createDate: '2023-10-25',
    });

    const formatResult = format(result, 'yyyy-MM-dd');

    expect(formatResult).toBe('2023-11-09');
  }, 60000);

  it('作成日の10日後が返ってくること', () => {

    const result = calcAlertStartDate({
      expectedPaymentDate: null,
      createDate: '2023-10-30',
    });

    const formatResult = format(result, 'yyyy-MM-dd');

    expect(formatResult).toBe('2023-11-09');
  }, 60000);

  it('作成日から計算した日付が返ってくること', () => {

    const result = calcAlertStartDate({
      expectedPaymentDate: '2023-11-05',
      createDate: '2023-11-05',
    });

    const formatResult = format(result, 'yyyy-MM-dd');

    expect(formatResult).toBe('2023-11-15');
  }, 60000);
});
