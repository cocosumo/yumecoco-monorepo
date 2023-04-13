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
) => {

  const queryArray: string[] = [];

  if (isActiveOnly) {
    queryArray.push('状態 in ("有効")');
  }

  return getAllRecords<RecordType>({
    app: appId,
    condition: queryArray.join(' and ') || undefined,
  });
};