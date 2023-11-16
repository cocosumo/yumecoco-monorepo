
import { getTextWidth } from '../../src/helpers/getTextWidth';

/**
 * 取得したテキストの幅を計算して、コンテナに収まるようにサイズを再調整する
 * @param {number} width コンテナ（セル）の幅（px、pt）
 * @param {string} text 表示する文字列
 * @returns number フォントサイズ
**/

export const calcFontSize = (
  width: number,
  text: string,
) => {
  let fontSize = 16;

  while (getTextWidth(text, fontSize) > width) {
    fontSize -= 0.5;
  }

  return fontSize;
};

