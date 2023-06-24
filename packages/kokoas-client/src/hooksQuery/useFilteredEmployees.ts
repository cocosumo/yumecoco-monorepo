import { FilterEmployeesParams, filterEmployees } from 'api-kintone';
import { useEmployees } from './useEmployees';
import { useCallback } from 'react';

export const useFilteredEmployees = (
  conditions: FilterEmployeesParams,
  isActiveOnly = true,
) => {
  return useEmployees({
    select: useCallback(
      (data) => filterEmployees(data, conditions ),
      [conditions],
    ),
    isActiveOnly,
  });
};
