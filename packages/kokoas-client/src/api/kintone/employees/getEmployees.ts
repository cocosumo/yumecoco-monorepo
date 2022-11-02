import { IEmployees } from 'types';
import { APPIDS, KintoneRecord } from '../config';

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

  return KintoneRecord.getAllRecords({
    app: APPIDS.employees,
    condition: queryArray.join(' and ') || undefined,
  }).then((res) => res as unknown as IEmployees[]);
};