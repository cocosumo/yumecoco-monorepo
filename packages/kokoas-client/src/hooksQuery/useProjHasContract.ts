import { useQuery } from '@tanstack/react-query';
import { AppIds } from 'config';
import { getEstimatesByProjId } from 'api-kintone';

/**
 * 工事番号で契約済み見積もりが存在するかを取得する
 */
export const useProjHasContract = (
  projId = '',
) => {
  return useQuery(
    [AppIds.projEstimates, { projId }],
    () =>  getEstimatesByProjId(projId),
    {

      enabled: !!projId,
      select: ({ records }) => {
        return records?.some(({ envStatus }) => !!envStatus.value);
      },
    },
  );
};