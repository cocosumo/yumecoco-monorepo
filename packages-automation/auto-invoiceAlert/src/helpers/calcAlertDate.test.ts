import { describe, it, expect } from '@jest/globals';
import { calcAlertDate } from './calcAlertDate';
import format from 'date-fns/format';


describe('calcAlertDate', () => {
  it('新築付帯工事の時、1か月後の日付が返ってくること', () => {

    const result = calcAlertDate({
      contractDateStr: '2023-03-31',
      projType: '新築付帯工事',
      contractAmt: 5500000,
      contractAmtPaymentDateStr: '2023-05-31',
    });

    expect(format(result, 'yyyy-MM-dd')).toBe('2023-04-30');
  }, 60000);

  it('リフォーム工事(500万円以上)の時、3か月後の日付が返ってくること', () => {

    const result = calcAlertDate({
      contractDateStr: '2023-11-30',
      projType: 'リフォーム工事',
      contractAmt: 5000000,
      contractAmtPaymentDateStr: '2023-10-01',
    });

    expect(format(result, 'yyyy-MM-dd')).toBe('2024-02-29');
  }, 60000);

  it('リフォーム工事(300万円以上)の時、2か月後の日付が返ってくること', () => {

    const result = calcAlertDate({
      contractDateStr: '2023-07-31',
      projType: 'リフォーム工事',
      contractAmt: 3000000,
      contractAmtPaymentDateStr: '2023-10-01',
    });

    expect(format(result, 'yyyy-MM-dd')).toBe('2023-09-30');
  }, 60000);

  it('リフォーム工事(300万円以上)の時、1か月後の日付が返ってくること', () => {

    const result = calcAlertDate({
      contractDateStr: '2023-01-31',
      projType: 'リフォーム工事',
      contractAmt: 2999999,
      contractAmtPaymentDateStr: '2023-02-01',
    });

    expect(format(result, 'yyyy-MM-dd')).toBe('2023-02-28');
  }, 60000);

  it('新築工事の時、契約日が返ってくること', () => {

    const result = calcAlertDate({
      contractDateStr: '2023-05-31',
      projType: '新築工事',
      contractAmt: 10000000,
      contractAmtPaymentDateStr: '2023-10-15',
    });

    expect(format(result, 'yyyy-MM-dd')).toBe('2023-10-15');
  }, 60000);

  it('新築工事の時、契約日が空の場合は3か月後の日付が返ってくること', () => {

    const result = calcAlertDate({
      contractDateStr: '2023-05-31',
      projType: '新築工事',
      contractAmt: 10000000,
      contractAmtPaymentDateStr: null,
    });

    expect(format(result, 'yyyy-MM-dd')).toBe('2023-08-31');
  }, 60000);
});
