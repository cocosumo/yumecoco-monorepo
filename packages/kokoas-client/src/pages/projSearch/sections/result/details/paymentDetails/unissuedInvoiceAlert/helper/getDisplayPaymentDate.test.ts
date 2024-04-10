import { getDisplayPaymentDate } from './getDisplayPaymentDate';
import { describe, it, expect } from '@jest/globals';



describe('getDisplayPaymentDate', () => {
  it('正しい日付を返す', async () => {
    const testDate: (Date | null) = new Date(2014, 4, 22);
    const result = getDisplayPaymentDate(testDate);

    expect(result).toBe('2014年5月22日');
  });

  it('nullの場合は空文字を返す', async () => {
    const testDate = null;
    const result = getDisplayPaymentDate(testDate);

    expect(result).toBe('');
  });

  it('不正な入力の場合は空文字を返す', async () => {
    const testDate = new Date('2000-6-40');
    const result = getDisplayPaymentDate(testDate);

    expect(result).toBe('');
  });

});
