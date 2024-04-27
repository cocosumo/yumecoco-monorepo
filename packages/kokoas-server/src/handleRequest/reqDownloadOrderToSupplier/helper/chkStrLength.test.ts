import { describe, expect, it } from '@jest/globals';
import { chkStrLength } from './chkStrLength';




describe('chkStrLength', () => {

  it('空文字の時はデフォルトのフォントサイズを返す', async () => {

    const result = chkStrLength({
      text: '',
      maxlen: 20,
      fontSize: 9,
    });

    expect(result).toBe(9);
  });

  it('文字が収まる時もデフォルトのフォントサイズを返す', async () => {

    const result = chkStrLength({
      text: 'あいうえおかきくけこさし',
      maxlen: 24,
      fontSize: 9,
    });

    expect(result).toBe(9);
  });

  it('文字長が長いときに文字数に合わせたフォントサイズを返す', async () => {

    const result = chkStrLength({
      text: 'あいうえおかきくけこさしす',
      maxlen: 24,
      fontSize: 9,
    });

    expect(result).toBe(8);
  });

});