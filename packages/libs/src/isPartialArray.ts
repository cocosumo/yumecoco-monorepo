
import intersection from 'lodash/intersection';

/**
 * 配列１の要素が配列２に含まれているかどうかを判定する
 * 
 * @param array1 
 * @param array2 
 * @returns {boolean} 配列１の要素が配列２に含まれている場合はtrue 
 */
export function isPartialArray(array1: string[], array2: string[]): boolean {
  if (array2.length === 0 || intersection(array1, array2).length === 0) {
    return false;
  }

  return intersection(array1, array2).length !== array1.length;
}