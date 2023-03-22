import { convertToHalfWidth } from './convertToHalfWidth';

/**
 * オブジェクト内の数値型の値を半角文字に変換する。
 * @template T
 * @param {T} obj - 数値型の値を変換するオブジェクト。
 * @returns {T} - 数値型の値が半角文字に変換された新しいオブジェクト。
 * @author chatGPT 3.5
 */
export const convertObjNumValsToHalfWidth = <T extends object>(
  obj: T,
): T => {
  const newObj: T = {} as T;
  
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      
      // 値に全角数字が含まれているかチェック
      if (typeof value === 'string' && value.match(/[０-９]/)) {
        // 全角数字を半角数字に変換
        const newValue = convertToHalfWidth(value);
        
        // 新しいオブジェクトに値を更新
        newObj[key as keyof T] = newValue as unknown as T[keyof T];
      } else {
        // 新しいオブジェクトに値を更新
        newObj[key as keyof T] = value as unknown as T[keyof T];
      }
    }
  }
  
  return newObj;
};