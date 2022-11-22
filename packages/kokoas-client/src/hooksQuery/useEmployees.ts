import { useQuery } from '@tanstack/react-query';
import { AppIds } from 'config';
import { getActiveEmployees } from 'api-kintone';

/**
 * Retrieves all active employee records
 * 全社員レコードを取得する
 *
 */
export const useEmployees = <T = Awaited<ReturnType<typeof getActiveEmployees>>>(
  options?: {
    select:  (data: Awaited<ReturnType<typeof getActiveEmployees>>) => T
  },
) => {
  return useQuery(
    [AppIds.employees],
    getActiveEmployees,
    { ...options },
  );
};