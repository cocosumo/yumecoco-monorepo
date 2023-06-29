import { useQuery } from '@tanstack/react-query';
import { AppIds } from 'config';
import { getEmployees } from 'api-kintone';

export const useEmployeeByIds = (empId: string | string[]) => {
  return useQuery(
    [AppIds.employees],
    () => getEmployees(false),
    {
      select: (data) => data.filter(({
        uuid,
      }) => typeof empId === 'string'
        ?  uuid.value === empId
        : empId.some(e => uuid.value === e)),
    },
  );
};