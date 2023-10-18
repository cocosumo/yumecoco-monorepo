import { describe, it, expect } from '@jest/globals';
import { getEarliestDateOfContract } from './getEarliestDateOfContract';


describe('getOldestDate', () => {
  it('contractAmtsに関わらず、一番以前の日付が返される', () => {

    const result = getEarliestDateOfContract({
      dates: [
        '2023-01-30',
        '2023-02-28',
        '2023-03-30',
        '2023-04-30',
        '2023-05-30',
      ],
      contractAmts: [
        '100000',
        '100000',
        '100000',
        '100000',
        '100000',
      ],
    });

    expect(result).toBe('2023-01-30');
  }, 60000);

  it('金額0のため、nullが返される', () => {

    const result = getEarliestDateOfContract({
      dates: [
        '2023-01-30',
        '2023-02-28',
        '2023-03-30',
        '2023-04-30',
        '2023-05-30',
      ],
      contractAmts: [
        '0',
        '0',
        '0',
        '0',
        '0',
      ],
    });

    expect(result).toBe(null);
  }, 60000);


  it('金額が空のため、nullが返される', () => {

    const result = getEarliestDateOfContract({
      dates: [
        '2023-01-30',
        '2023-02-28',
        '2023-03-30',
        '2023-04-30',
        '2023-05-30',
      ],
      contractAmts: [
        '',
        '',
        '',
        '',
        '',
      ],
    });

    expect(result).toBe(null);
  }, 60000);


  it('契約金額が設定されている、一番以前の日付が返される', () => {

    const result = getEarliestDateOfContract({
      dates: [
        '2023-10-30',
        '2023-12-30',
        '2023-11-30',
        '2023-04-30',
        '2023-05-30',
      ],
      contractAmts: [
        '0',
        '100000',
        '100000',
        '0',
        '',
      ],
    });

    expect(result).toBe('2023-11-30');
  }, 60000);

  it('引数に誤りがあるため、nullが返される', () => {

    const result = getEarliestDateOfContract({
      dates: [
        '2023-10-30',
        '2023-12-30',
        '2023-11-30',
        '2023-04-30',
        '2023-05-30',
      ],
      contractAmts: [
        '0',
        '100000',
        '100000',
        '0',
      ],
    });

    expect(result).toBe(null);
  }, 60000);
});
