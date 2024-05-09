import { describe, expect, it } from '@jest/globals';
import { getProjNumJa } from './getProjNumJa';



describe('getProjNumJa', () => {
  it('店舗名とdataIdが揃っている場合', async () => {

    const result = getProjNumJa('店舗名', 'kkk-C01-1234');

    expect(result).toBe('店舗名 C011234');
  });

  it('店舗名がundefinedの場合', async () => {

    const result = getProjNumJa(undefined, 'kkk-C01-1234');

    expect(result).toBe('');
  });

  it('dataIdが空の場合', async () => {

    const result = getProjNumJa('店舗名', '');

    expect(result).toBe('');
  });
  it('店舗名が空の場合', async () => {

    const result = getProjNumJa('', 'kkk-C01-1234');

    expect(result).toBe('');
  });
});