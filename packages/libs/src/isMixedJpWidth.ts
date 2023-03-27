
/**
 * 全角文字と半角文字が混在しているかどうかを判定する関数。
 * @param {string} value - 判定対象の文字列。
 * @returns {boolean} 全角文字と半角文字が混在している場合は true、そうでない場合は false。
*/
export const isMixedJpWidth = (value: string | number) => {
  // Matches any 全角 character.
  const fullWidthRegex = /[\u{FF01}-\u{FF5E}\u{FFE0}-\u{FFE6}\u{3000}]/ug;

  // Matches any 半角 character.
  const halfWidthRegex = /[\u{0020}-\u{007E}\u{FF61}-\u{FF9F}]/ug;

  const hasFullWidthChars = fullWidthRegex.test(String(value));
  const hasHalfWidthChars = halfWidthRegex.test(String(value));

  return hasFullWidthChars && hasHalfWidthChars;
};