import { useQuery } from '@tanstack/react-query';
import { AppIds } from 'config';
import { getActiveEmployees } from 'api-kintone';

export const useEmployeeByIds = (empId: string | string[]) => {
  return useQuery(
    [AppIds.employees],
    getActiveEmployees,
    {
      select: (data) => data.filter(({
        $id,
      }) => typeof empId === 'string'
        ?  $id.value === empId
        : empId.some(e => $id.value === e),
      ),
    },
  );
};