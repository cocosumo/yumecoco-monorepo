import { useQuery } from '@tanstack/react-query';
import { APPIDS } from '../api/kintone';
import { getActiveEmployees } from '../api/kintone/employees/getActiveEmployees';

export const useEmployeeById = (empId: string) => {
  return useQuery(
    [APPIDS.employees],
    getActiveEmployees,
    {
      staleTime: 1000 * 60 * 60,
      select: (data) => data.filter(({ $id }) => $id.value === empId ),
    },
  );
};