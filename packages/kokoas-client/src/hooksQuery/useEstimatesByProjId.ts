import { useQuery } from '@tanstack/react-query';
import { AppIds } from 'config';
import { getEstimatesByProjId } from 'api-kintone';

/**
 * 工事番号で見積リストを取得する
 */
export const useEstimatesByProjId = (
  projId = '',
) => {

  return useQuery(
    [AppIds.projEstimates, projId],
    () =>  getEstimatesByProjId(projId),
    {
      enabled: !!projId,
    },
  );
};