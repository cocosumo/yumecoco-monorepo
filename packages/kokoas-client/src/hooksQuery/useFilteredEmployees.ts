import { FilterEmployeesParams, filterEmployees } from 'api-kintone';
import { useEmployees } from './useEmployees';

export const useFilteredEmployees = (
  conditions: FilterEmployeesParams,
  isActiveOnly = true,
) => {
  return useEmployees({
    select: (data) => filterEmployees(data, conditions ),
    isActiveOnly,
  });
};
