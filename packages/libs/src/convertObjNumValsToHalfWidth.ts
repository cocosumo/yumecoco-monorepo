import { convertToHalfWidth } from './convertToHalfWidth';

/**
  オブジェクト内の数値型の値を半角文字に変換する。
  @template T
  @param {T} obj - 数値型の値を変換するオブジェクト。
  @returns {T} - 数値型の値が半角文字に変換された新しいオブジェクト。
  @author chatGPT 3.5
*/
export const convertObjNumValsToHalfWidth = <T extends object>(obj: T): T => {
  return Object.keys(obj).reduce((newObj, key) => {
    const value = obj[key as keyof T];

    // 値に全角数字が含まれているかチェック
    if (typeof value === 'string' && (value as string).match(/[０-９]/)) {
      // 全角数字を半角数字に変換
      const newValue = convertToHalfWidth(value);

      // 新しいオブジェクトに値を更新
      newObj[key as keyof T] = newValue;
    } else {
      // 新しいオブジェクトに値を更新
      newObj[key as keyof T] = value;
    }

    return newObj;
  }, {} as T);
};
