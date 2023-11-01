import { describe, it, expect } from '@jest/globals';
import { calcPaymentDate } from './calcPaymentDate';


describe('calcPaymentDate', () => {
  it('支払予定日が返ってくること', () => {

    const result = calcPaymentDate({
      expectedPaymentDate: '2023-11-05',
      createDate: '2023-11-01',
    });

    expect(result).toBe('2023-11-05');
  }, 60000);

  it('作成日の10日後が返ってくること', () => {

    const result = calcPaymentDate({
      expectedPaymentDate: null,
      createDate: '2023-10-30',
    });

    expect(result).toBe('2023-11-09');
  }, 60000);

});
