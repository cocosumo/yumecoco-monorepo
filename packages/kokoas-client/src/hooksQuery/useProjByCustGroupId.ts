import { useQuery } from '@tanstack/react-query';
import { getProjsByCustGroupId } from 'api-kintone';
import { AppIds } from 'config';
import { IProjects } from 'types';

export const useProjByCustGroupId = <T>(
  custGroupId: string,
  options?: {
    select: (data: IProjects[]) => T
  },
) => {
  return useQuery(
    [AppIds.custGroups, { custGroupId }],
    () => getProjsByCustGroupId(custGroupId),
    {
      enabled: !!custGroupId,
      ...options,
    },
  );
};