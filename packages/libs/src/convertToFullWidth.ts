
/**
 * 半角数字を全角数字に変換し、全角表現の文字列を返します。
 * 小数点以下がある場合には、小数点も全角に変換します。
 *
 * @param {number|string} num - 変換する半角数字
 * @returns {string} 全角表現の文字列
 * @throws {TypeError} 引数が数値でも文字列でもない場合に、TypeErrorをスローします。
 *
 * @example
 * // returns "１２３４"
 * convertToFullWidth(1234);
 *
 * @example
 * // returns "－１２３．４５"
 * convertToFullWidth(-123.45);
 *
 * @example
 * // returns "NaN"
 * convertToFullWidth("abc");
 * 
 * @author chaptGPT 3.5
 */
export function convertToFullWidth(num: number | string): string {
  // 引数が数値でない場合、NaNを返します。
  if (typeof num !== 'number' && !/^\d+(\.\d+)?$/.test(num)) {
    return 'NaN';
  }

  // 数字または文字列を整数部と小数部（ある場合）に分割します。
  const [integerPart, fractionalPart] = String(num).split('.');

  // 符号を取得します。
  const sign = integerPart.startsWith('-') ? '－' : '';

  // 整数部の符号を除いた部分を全角文字に変換します。
  const absIntegerDigits = integerPart.replace('-', '').split('')
    .map(d => String.fromCharCode(0xff10 + parseInt(d)));
  const fullWidthInteger = sign + absIntegerDigits.join('');

  // 小数部がない場合は、全角整数部を返します。
  if (!fractionalPart) {
    return fullWidthInteger;
  }

  // 小数部を全角文字に変換します。
  const fractionalDigits = fractionalPart.split('').map(d => String.fromCharCode(0xff10 + parseInt(d)));
  const fullWidthFractional = fractionalDigits.join('');

  // 小数点を含む全角表現を返します。
  return `${fullWidthInteger}．${fullWidthFractional}`;
}
