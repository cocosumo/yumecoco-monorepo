import { getAllRecords } from '../common/getAllRecords';
import { appId, RecordType } from './config';

/**
 * 社員名簿を取得する
 * 
 * @param isActiveOnly デフォルト：true.
 * @returns 
 */
export const getEmployees  = async (
  isActiveOnly = true,
  statuses : ('有効' | '無効' | '保留(退職済)')[] = ['有効'], 
) => {

  const queryArray: string[] = [];

  if (isActiveOnly) {
    queryArray.push(`状態 in ( ${statuses.map((s) => `"${s}"`).join(',')})`);
  }

  return getAllRecords<RecordType>({
    app: appId,
    condition: queryArray.join(' and ') || undefined,
  });
};