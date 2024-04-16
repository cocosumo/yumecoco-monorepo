import { describe, expect, it } from '@jest/globals';
import { getConstPeriod } from './getConstPeriod';



describe('getConstPeriod', () => {
  it('開始日、終了日共に空の場合', async () => {

    const result = getConstPeriod({
      startDate: '',
      finishDate: '',
    });

    expect(result).toBe('');
  });

  it('開始日が空の場合', async () => {

    const result = getConstPeriod({
      startDate: '',
      finishDate: '2024-01-01',
    });

    expect(result).toBe('2024年1月1日');
  });

  it('終了日が空の場合', async () => {

    const result = getConstPeriod({
      startDate: '2024-02-01',
      finishDate: '',
    });

    expect(result).toBe('2024年2月1日');
  });

  it('開始日、終了日が同日の場合', async () => {

    const result = getConstPeriod({
      startDate: '2024-03-10',
      finishDate: '2024-03-10',
    });

    expect(result).toBe('2024年3月10日');
  });

  it('開始日、終了日が別日で設定されている場合', async () => {

    const result = getConstPeriod({
      startDate: '2024-01-01',
      finishDate: '2024-03-31',
    });

    expect(result).toBe('2024年1月1日 から 2024年3月31日 まで');
  });

});