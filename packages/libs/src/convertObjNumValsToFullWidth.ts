import { convertToFullWidth } from './convertToFullWidth';

/**
 * オブジェクトの数値の値を全角に変換します。
 *
 * @template T
 * @param {T} obj - 数値の値を変換するオブジェクト
 * @returns {T} 数値の値が全角に変換されたオブジェクト
 */
export const convertObjNumValsToFullWidth = <T extends object>(
  obj: T,
): T => {
  return Object.keys(obj).reduce((acc, key) => {
    const value = obj[key as keyof T];
    if (typeof value === 'number') {
      const newValue = convertToFullWidth(value);
      acc[key as keyof T] = newValue as unknown as T[keyof T];
    } else {
      acc[key as keyof T] = value as unknown as T[keyof T];
    }
    return acc;
  }, {} as T);
};