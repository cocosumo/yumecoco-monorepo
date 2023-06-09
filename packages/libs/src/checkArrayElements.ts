
import difference from 'lodash/difference';
import intersection from 'lodash/intersection';

/**
 * 配列の要素をチェックする
 * 
 * @param array1 
 * @param array2 
 * @returns 
 * - Partial: 部分一致
 * - Existing: 完全一致
 * - Nothing: 一致なし
 */
export function checkArrayElements(array1: string[], array2: string[]) {
  const diff = difference(array1, array2);
  const inter = intersection(array1, array2);

  if (diff.length === array1.length) {
    return 'Nothing';
  } else if (inter.length === array1.length) {
    return 'Existing';
  } else {
    return 'Partial';
  }
}