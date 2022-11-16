import { useQuery } from '@tanstack/react-query';
import { AppIds } from 'config';
import { getEstimatesByProjId } from 'api-kintone';

/**
 * 工事番号で見積リストを取得する
 */
export const useEstimatesByProjId = <T = Awaited<ReturnType<typeof getEstimatesByProjId>>>(
  projId = '',
  options?: {
    select: (data: Awaited<ReturnType<typeof getEstimatesByProjId>>) => T
  },
) => {

  return useQuery(
    [AppIds.projEstimates, { projId }],
    () => getEstimatesByProjId(projId),
    {
      ...options,
      enabled: !!projId,
    },
  );
};