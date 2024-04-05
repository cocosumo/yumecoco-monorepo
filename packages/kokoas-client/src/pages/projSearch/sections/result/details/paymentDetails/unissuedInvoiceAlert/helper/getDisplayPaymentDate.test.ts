import { getDisplayPaymentDate } from './getDisplayPaymentDate';
import { describe, it, expect } from '@jest/globals';



describe('getDisplayPaymentDate', () => {
  it('正しい日付を返す', async () => {
    const testDate: (string | null) = 'Thu May 22 2014 00:00:00 GMT+0900 (日本標準時)';
    const result = getDisplayPaymentDate(testDate);

    expect(result).toBe('2014年5月22日');
  });

  it('nullの場合は空文字を返す', async () => {
    const testDate: (string | null) = null;
    const result = getDisplayPaymentDate(testDate);

    expect(result).toBe('');
  });
  
  it('不正な入力の場合は空文字を返す', async () => {
    const testDate: (string | null) = 'Invalid Date';
    const result = getDisplayPaymentDate(testDate);

    expect(result).toBe('');
  });
  
  it('空文字の場合は空文字を返す', async () => {
    const testDate: (string | null) = '';
    const result = getDisplayPaymentDate(testDate);

    expect(result).toBe('');
  });
  
});