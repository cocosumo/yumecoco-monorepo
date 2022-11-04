import { ktRecord } from './../client';
import { appId, RecordType } from './config';

export const getEmployees  = async (
  isActiveOnly = true,
) => {

  const queryArray: string[] = [];

  if (isActiveOnly) {
    queryArray.push('状態 in ("有効")');
  }

  /*   const queryArray = [
    '状態 in ("有効")',
    '役職 in ("店長", "主任", "営業", "工務")',
  ]; */

  return (await ktRecord()).getAllRecords({
    app: appId,
    condition: queryArray.join(' and ') || undefined,
  }).then((res) => res as unknown as RecordType[]);
};