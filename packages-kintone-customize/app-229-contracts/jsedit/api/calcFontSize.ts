
import { getTextWidth } from '../../src/helpers/getTextWidth';

/**
 * 表のセル内に文字を収める。
 * 別ファイルにimportして調整したい部分を指定する。
 * @param {number} width コンテナ（セル）の幅（px、pt）
 * @param {string} text 取得したテキストの幅を計算して、コンテナに収まるようにサイズを再調整する
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

