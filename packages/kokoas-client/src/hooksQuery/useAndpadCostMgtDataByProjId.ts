import { useQuery } from '@tanstack/react-query';
import { AppIds } from 'config';
import { getCostMgtDataByProjId } from '../api/andpad/getCostMgtDataByProjId';

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