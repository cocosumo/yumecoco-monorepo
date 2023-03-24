
// 全角数字を半角数字に変換
export function convertToHalfWidth<T>(input: T): T {
  // 文字列でない入力はそのまま返す
  if (typeof input !== 'string') {
    return input;
  }

  // 全角数字を半角数字に変換する
  let result = input.replace(/[０-９]/g, (match) => {
    return String.fromCharCode(match.charCodeAt(0) - 0xfee0);
  });

  // マイナス記号を半角ハイフンに変換する
  result = result.replace(/[－−―ー]/g, '-');

  // 小数点を半角ピリオドに変換する
  result = result.replace(/[．。]/g, '.');

  return result as T;
}
