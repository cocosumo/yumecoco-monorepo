import { useQuery } from '@tanstack/react-query';
import { getCostMgtDataByProjId } from 'api-kintone';
import { AppIds } from 'config';

export const useAndpadCostMgtDataByProjId = (projId: string) => {

  return useQuery(
    [AppIds.projects, 'procurements', AppIds.andpadProcurements, projId],
    () => getCostMgtDataByProjId(projId),
    {
      enabled: !!projId,
      staleTime: 5000,
    },
  );
};