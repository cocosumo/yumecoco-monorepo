import { useQuery } from '@tanstack/react-query';
import { getCostMgtData } from 'api-kintone';
import { AppIds } from 'config';

export const useCostManagementData = (projId: string) => {

  return useQuery(
    [AppIds.projects, 'andpad', projId],
    () => getCostMgtData(projId),
    {
      enabled: !!projId,
      staleTime: 5000,
    },
  );
};