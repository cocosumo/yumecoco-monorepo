import { getEarliestDate } from './getEarliestDate';

import { describe, it, expect } from '@jest/globals';

describe('getEarliestDate', () => {
  it('一番過去の日付を取得する', async () => {
    const dates: (string | null)[] = ['2023-01-15', null, '2022-12-25', '2024-02-09', ''];
    const earliestDate = getEarliestDate(dates);

    expect(earliestDate).toBe('2022-12-25');
  });

  it('nullの時に空文字を返す', async () => {
    const dates: (string | null)[] = [null, null, null, null];
    const earliestDate = getEarliestDate(dates);

    expect(earliestDate).toBe('');
  });

  it('空文字のときに空文字を返す', async () => {
    const dates: (string | null)[] = ['', '', '', ''];
    const earliestDate = getEarliestDate(dates);

    expect(earliestDate).toBe('');
  });
});