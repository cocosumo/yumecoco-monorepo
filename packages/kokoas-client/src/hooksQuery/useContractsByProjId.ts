import { useQuery } from '@tanstack/react-query';
import { AppIds } from 'config';
import { getEstimatesByProjId } from 'api-kintone';

/**
 * 工事番号で契約済み見積もり一覧を取得する
 */
export const useContractsByProjId = (
  projId = '',
) => {

  return useQuery(
    [AppIds.projEstimates, { projId }],
    () =>  getEstimatesByProjId(projId),
    {
      enabled: !!projId,
      select: ({ records }) => {
        return records?.filter(({ envStatus }) => !!envStatus.value);
      },
    },
  );
};