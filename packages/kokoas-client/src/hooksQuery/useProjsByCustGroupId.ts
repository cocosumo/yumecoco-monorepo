import { useQuery } from '@tanstack/react-query';
import { getProjsByCustGroupId } from 'api-kintone';
import { AppIds } from 'config';
import { IProjects } from 'types';

export const useProjsByCustGroupId = <T = IProjects[]>(
  custGroupId: string,
  options?: {
    select: (data: IProjects[]) => T
  },
) => {
  return useQuery(
    [AppIds.projects, { custGroupId }],
    () => getProjsByCustGroupId(custGroupId),
    {
      enabled: !!custGroupId,
      ...options,
    },
  );
};