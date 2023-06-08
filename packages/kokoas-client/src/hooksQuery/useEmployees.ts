import { useQuery } from '@tanstack/react-query';
import { AppIds } from 'config';
import { getActiveEmployees, getEmployees } from 'api-kintone';

/**
 * Retrieves all active employee records
 * 全社員レコードを取得する
 *
 */
export const useEmployees = <T = Awaited<ReturnType<typeof getActiveEmployees>>>(
  options?: {
    isActive?: boolean,
    select:  (data: Awaited<ReturnType<typeof getActiveEmployees>>) => T
    enabled?: boolean,
  },
) => {
  const {
    isActive = true,
    enabled = true,
    ...otherOptions
  } = options || {};

  return useQuery(
    [AppIds.employees, isActive],
    () => getEmployees(isActive),
    { 
      ...otherOptions,
      enabled, 
    },
  );
};