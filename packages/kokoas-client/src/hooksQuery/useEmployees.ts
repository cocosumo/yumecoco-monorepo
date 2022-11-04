import { useQuery } from '@tanstack/react-query';
import { APPIDS } from '../api/kintone';
import { getActiveEmployees } from 'api-kintone';

/**
 * Retrieves all active employee records
 * 全社員レコードを取得する
 *
 */
export const useEmployees = () => {
  return useQuery(
    [APPIDS.employees],
    getActiveEmployees,
  );
};