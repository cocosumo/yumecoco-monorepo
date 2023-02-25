import { filterEmployees } from 'api-kintone';
import { useEmployees } from './useEmployees';
import { useCallback } from 'react';

export const useFilteredEmployees = (conditions: Parameters<typeof filterEmployees>[1]) => {
  return useEmployees({
    select: useCallback(
      (data) => filterEmployees(data, conditions ),
      [conditions],
    ),
  });
};
