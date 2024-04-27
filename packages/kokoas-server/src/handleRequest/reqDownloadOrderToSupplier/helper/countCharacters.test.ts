import { describe, expect, it } from '@jest/globals';
import { countCharacters } from './countCharacters';




describe('countCharacters', () => {
  
  it('半角と記号の文字数を正しくカウントできている', async () => {

    const result = countCharacters('*9087 & 15%');

    expect(result).toBe(11);
  });
  
  it('全角の文字数を正しくカウントできている', async () => {

    const result = countCharacters('直接仮設工事');

    expect(result).toBe(12);
  });

  it('半角と全角交じりの文字数を正しくカウントできている', async () => {

    const result = countCharacters('テスト123456テキスト');

    expect(result).toBe(20);
  });

  it('テキストが空の場合、0を返す', async () => {

    const result = countCharacters('');

    expect(result).toBe(0);
  });
});