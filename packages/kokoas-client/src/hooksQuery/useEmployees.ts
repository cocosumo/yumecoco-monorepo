import { useQuery } from '@tanstack/react-query';
import { AppIds } from 'config';
import { getEmployees } from 'api-kintone';




/**
 * Retrieves all active employee records
 * 全社員レコードを取得する
 *
 */
export const useEmployees = <T = UseEmployeesReturn>(
  options?: {
    isActiveOnly?: boolean,
    select?:  (data: UseEmployeesReturn) => T
    enabled?: boolean,
  },
) => {
  const {
    isActiveOnly = true,
    enabled = true,
    ...otherOptions
  } = options || {};

  return useQuery(
    [AppIds.employees, isActiveOnly],
    () => getEmployees(isActiveOnly),
    { 
      ...otherOptions,
      enabled, 
    },
  );
};

export type UseEmployeesReturn = Awaited<ReturnType<typeof getEmployees>>;
