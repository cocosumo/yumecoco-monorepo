
export type KintoneOperators =
| 'like'
| 'not like'
| '='
| '!='
| '>'
| '<'
| '<='
| '>='
| 'in'
| 'not in';

/**
 * 安全なタイプでクエリを生成するため。
 *
 * @param field Field名
 * @param value 値
 * @param operator defaultは "like"
 * @returns Query string
 * @example
 *   const custFieldMatches = fieldMatches<KeyOfCustGroupAll>;
 *   const condition = custFieldMatches('storeName', "豊田")
 *
 * @link https://developer.cybozu.io/hc/ja/articles/202331474-%E3%83%AC%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E5%8F%96%E5%BE%97-GET-
 *
 */
export const fieldMatches = <T>(
  field: T,
  value: string,
  operator : KintoneOperators = 'like',
) => {
  switch (operator) {
    case 'in':
    case 'not in':
      return `${field} ${operator} ("${value}")`;
    default:
      return `${field} ${operator} "${value}"`;
  }

};