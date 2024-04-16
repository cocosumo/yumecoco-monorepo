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
      finishDate: '2024-1-1',
    });

    expect(result).toBe('2024-1-1');
  });

  it('終了日が空の場合', async () => {

    const result = getConstPeriod({
      startDate: '2024-2-1',
      finishDate: '',
    });

    expect(result).toBe('2024-2-1');
  });

  it('開始日、終了日が同日の場合', async () => {

    const result = getConstPeriod({
      startDate: '2024-3-10',
      finishDate: '2024-3-10',
    });

    expect(result).toBe('2024-3-10');
  });

  it('開始日、終了日が別日で設定されている場合', async () => {

    const result = getConstPeriod({
      startDate: '2024-1-1',
      finishDate: '2024-3-31',
    });

    expect(result).toBe('2024-1-1 から 2024-3-31 まで');
  });

});