import { getEarliestDate } from './getEarliestDate';

import { describe, it, expect } from '@jest/globals';

describe('getEarliestDate', () => {
  it('一番過去の日付を取得する', async () => {
    const dates: string[] = ['2023-01-15', '2022-12-25', '2024-02-09', ''];
    const earliestDate = getEarliestDate(dates);

    expect(earliestDate).toBe('2022-12-25');
  });

  it('空文字を返す', async () => {
    const dates: string[] = ['', '', '', ''];
    const earliestDate = getEarliestDate(dates);

    expect(earliestDate).toBe('');
  });
});